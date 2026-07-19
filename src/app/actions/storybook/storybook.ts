import { executeStep1 } from './step1';
import { executeStepN } from './stepN';
import { executeStep12 } from './step12';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

console.log('Initializing Supabase client');
// Create a Supabase client without using cookies
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

type ProgressStatus = {
  step: number;
  message: string;
  totalSteps: number;
  completed: boolean;
  data?: {
    text?: string;
    page?: number | string;
  };
};

type ProgressCallback = (status: ProgressStatus) => void;

// Helper function to upload image to Storage
async function uploadImageToStorage(base64Data: string, userId: string, bookId: number, imageName: string) {
  console.log(`[UPLOAD] Starting upload for ${imageName} - User ID: ${userId}, Book ID: ${bookId}`);
  try {
    // Convert base64 to buffer
    console.log(`[UPLOAD] Converting base64 to buffer for ${imageName}`);
    const buffer = Buffer.from(base64Data, 'base64');

    // Create a unique path
    const filePath = `books/${imageName}-${bookId}.png`;
    console.log(`[UPLOAD] Created file path: ${filePath}`);

    // Upload to Supabase Storage
    console.log(`[UPLOAD] Uploading ${imageName} to Supabase Storage...`);
    const { error } = await supabase.storage.from('manim-videos').upload(filePath, buffer, {
      contentType: 'image/png',
      upsert: true,
    });

    if (error) {
      console.error(`[UPLOAD ERROR] Error uploading ${imageName}:`, error);
      return null;
    }

    // Get public URL - using the same bucket name as upload
    console.log(`[UPLOAD] Getting public URL for ${imageName}`);
    const {
      data: { publicUrl },
    } = supabase.storage.from('manim-videos').getPublicUrl(filePath);

    console.log(`[UPLOAD] Successfully uploaded ${imageName}. Public URL: ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    console.error(`[UPLOAD ERROR] Error in uploadImageToStorage for ${imageName}:`, error);
    return null;
  }
}

// Type guard to ensure image data is string
function isImageDataString(data: unknown): data is string {
  return typeof data === 'string';
}

export async function createStorybook(tema: string, character: string, user_id: string | undefined, onProgress?: ProgressCallback) {
  console.log(`[STORYBOOK] Starting storybook creation - Theme: "${tema}", Character: "${character}", User ID: ${user_id || 'undefined'}`);
  const totalSteps = 12;
  let bookId: number | null = null;

  // Step 1: Create story text
  console.log('[STORYBOOK] Step 1: Creating story text');
  onProgress?.({
    step: 1,
    totalSteps,
    message: 'Generating story text...',
    completed: false,
  });

  const teksCerita = await executeStep1(tema, character);
  console.log(`[STORYBOOK] Step 1 complete - Success: ${teksCerita.success}`, teksCerita.success ? 'Story generated' : `Error: ${teksCerita.error}`);

  if (!teksCerita.success) {
    console.error('[STORYBOOK ERROR] Failed to generate story text:', teksCerita.error);
    onProgress?.({
      step: 1,
      totalSteps,
      message: `Error generating story: ${teksCerita.error}`,
      completed: true,
    });

    return {
      success: false,
      error: teksCerita.error,
    };
  }

  onProgress?.({
    step: 1,
    totalSteps,
    message: 'Story text generated successfully',
    completed: true,
    data: { text: teksCerita.data || '' },
  });

  if (typeof teksCerita.data !== 'string') {
    console.error('[STORYBOOK ERROR] Invalid story data format:', typeof teksCerita.data);
    onProgress?.({
      step: 1,
      totalSteps,
      message: 'Invalid story data format',
      completed: true,
    });

    return {
      success: false,
      error: 'Invalid story data format',
    };
  }

  // Extract title from the story text using OpenAI
  console.log('[STORYBOOK] Extracting title from story text');
  onProgress?.({
    step: 1,
    totalSteps,
    message: 'Extracting story title...',
    completed: false,
  });

  let title = '';
  try {
    console.log('[STORYBOOK] Calling OpenAI to extract title');
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Anda adalah seorang asisten yang mengekstrak judul dari sebuah cerita, atau membuat judul baru berdasarkan cerita yang ada jika tidak ada judul yang diberikan. Jika membuat judul baru, buatlah judul tersebut menarik dan pendek. Return hanya judul, tidak ada yang lain.',
        },
        {
          role: 'user',
          content: `Dapatkan judul untuk cerita ini: ${teksCerita.data.substring(0, 1500)}...`,
        },
      ],
      temperature: 0.7,
      max_tokens: 30,
    });

    title = response.choices[0].message.content?.trim() || '';
    console.log(`[STORYBOOK] Title extracted: "${title}"`);

    // Fallback if no title was generated
    if (!title) {
      console.log('[STORYBOOK] No title generated, using fallback approach');
      const storyLines = teksCerita.data.split('\n').filter((line) => line.trim().length > 0);
      title = storyLines[0] || 'Untitled Story';

      // If the title is too long, truncate it
      if (title.length > 100) {
        title = title.substring(0, 97) + '...';
      }
      console.log(`[STORYBOOK] Fallback title: "${title}"`);
    }

    onProgress?.({
      step: 1,
      totalSteps,
      message: `Title extracted: "${title}"`,
      completed: true,
    });

    // Create initial book record with title and theme
    console.log('[STORYBOOK] Creating book record in database');
    console.log('[DATABASE] Inserting book record with:', { title, theme: tema, user_id, story_text_length: teksCerita.data.length + ' chars' });

    const { data: bookData, error: bookError } = await supabase
      .from('books')
      .insert([
        {
          title,
          theme: tema,
          user_id: user_id,
        },
      ])
      .select('id')
      .single();

    if (bookError) {
      console.error('[DATABASE ERROR] Error creating book record:', bookError);
      return {
        success: false,
        error: 'Failed to create book record: ' + bookError.message,
      };
    } else {
      bookId = bookData.id;
      console.log('[DATABASE] Created book with ID:', bookId);
    }
  } catch (error) {
    console.error('[STORYBOOK ERROR] Error extracting title:', error);
    // Use fallback approach for title
    const storyLines = teksCerita.data.split('\n').filter((line) => line.trim().length > 0);
    title = storyLines[0] || 'Untitled Story';

    // If the title is too long, truncate it
    if (title.length > 100) {
      title = title.substring(0, 97) + '...';
    }
  }

  // Ensure we have a user_id and bookId for storage paths
  if (!user_id || !bookId) {
    console.error('[STORYBOOK ERROR] Missing user_id or bookId required for image storage', { user_id, bookId });
    return {
      success: false,
      error: 'Missing user_id or bookId required for image storage',
    };
  }

  // Image URLs to store in the database
  const imageUrls: Record<string, string | null> = {
    cover: null,
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    image6: null,
    image7: null,
    image8: null,
    image9: null,
    image10: null,
  };

  // Step 2: Generate page 1 image
  console.log('[STORYBOOK] Step 2: Generating page 1 illustration');
  onProgress?.({
    step: 2,
    totalSteps,
    message: 'Generating page 1 illustration...',
    completed: false,
  });

  const image1 = await executeStepN(2, teksCerita.data);
  console.log(`[STORYBOOK] Page 1 illustration result - Success: ${image1.success}`, image1.success ? `Data length: ${isImageDataString(image1.data) ? image1.data.length : 'N/A'} chars` : `Error: ${image1.error}`);

  if (image1.success && isImageDataString(image1.data)) {
    console.log('[STORYBOOK] Uploading page 1 illustration');
    imageUrls.image1 = await uploadImageToStorage(image1.data, user_id, bookId, 'page1');
    console.log(`[DATABASE] Image1 URL: ${imageUrls.image1 || 'null'}`);
    if (imageUrls.image1) {
      try {
        console.log('[DATABASE] Updating book record with image1 URL');
        const { data, error } = await supabase.from('books').update({ image1: imageUrls.image1 }).eq('id', bookId);

        if (error) {
          console.log('Error:', error);
        }

        console.log('[DATABASE] Book record updated with image1 URL', data);
      } catch (error) {
        console.error('[DATABASE ERROR] Error updating book with image1 URL:', error);
      }
    }
  }

  onProgress?.({
    step: 2,
    totalSteps,
    message: image1.success ? 'Page 1 illustration generated' : 'Failed to generate page 1 illustration',
    completed: true,
    data: image1.success ? { page: 1 } : undefined,
  });

  // Step 3: Generate page 2 image
  console.log('[STORYBOOK] Step 3: Generating page 2 illustration');
  onProgress?.({
    step: 3,
    totalSteps,
    message: 'Generating page 2 illustration...',
    completed: false,
  });

  const image2 = await executeStepN(3, teksCerita.data, image1.success && isImageDataString(image1.data) ? image1.data : undefined);
  console.log(`[STORYBOOK] Page 2 illustration result - Success: ${image2.success}`, image2.success ? `Data length: ${isImageDataString(image2.data) ? image2.data.length : 'N/A'} chars` : `Error: ${image2.error}`);

  if (image2.success && isImageDataString(image2.data)) {
    console.log('[STORYBOOK] Uploading page 2 illustration');
    imageUrls.image2 = await uploadImageToStorage(image2.data, user_id, bookId, 'page2');
    console.log(`[DATABASE] Image2 URL: ${imageUrls.image2 || 'null'}`);
    if (imageUrls.image2) {
      try {
        console.log('[DATABASE] Updating book record with image2 URL');
        await supabase.from('books').update({ image2: imageUrls.image2 }).eq('id', bookId);
        console.log('[DATABASE] Book record updated with image2 URL');
      } catch (error) {
        console.error('[DATABASE ERROR] Error updating book with image2 URL:', error);
      }
    }
  }

  onProgress?.({
    step: 3,
    totalSteps,
    message: image2.success ? 'Page 2 illustration generated' : 'Failed to generate page 2 illustration',
    completed: true,
    data: image2.success ? { page: 2 } : undefined,
  });

  // Step 4: Generate page 3 image
  console.log('[STORYBOOK] Step 4: Generating page 3 illustration');
  onProgress?.({
    step: 4,
    totalSteps,
    message: 'Generating page 3 illustration...',
    completed: false,
  });

  const image3 = await executeStepN(4, teksCerita.data, image1.success && isImageDataString(image1.data) ? image1.data : undefined);
  console.log(`[STORYBOOK] Page 3 illustration result - Success: ${image3.success}`, image3.success ? `Data length: ${isImageDataString(image3.data) ? image3.data.length : 'N/A'} chars` : `Error: ${image3.error}`);

  if (image3.success && isImageDataString(image3.data)) {
    console.log('[STORYBOOK] Uploading page 3 illustration');
    imageUrls.image3 = await uploadImageToStorage(image3.data, user_id, bookId, 'page3');
    console.log(`[DATABASE] Image3 URL: ${imageUrls.image3 || 'null'}`);
    if (imageUrls.image3) {
      try {
        console.log('[DATABASE] Updating book record with image3 URL');
        await supabase.from('books').update({ image3: imageUrls.image3 }).eq('id', bookId);
        console.log('[DATABASE] Book record updated with image3 URL');
      } catch (error) {
        console.error('[DATABASE ERROR] Error updating book with image3 URL:', error);
      }
    }
  }

  onProgress?.({
    step: 4,
    totalSteps,
    message: image3.success ? 'Page 3 illustration generated' : 'Failed to generate page 3 illustration',
    completed: true,
    data: image3.success ? { page: 3 } : undefined,
  });

  // Step 5: Generate page 4 image
  console.log('[STORYBOOK] Step 5: Generating page 4 illustration');
  onProgress?.({
    step: 5,
    totalSteps,
    message: 'Generating page 4 illustration...',
    completed: false,
  });

  const image4 = await executeStepN(5, teksCerita.data, image1.success && isImageDataString(image1.data) ? image1.data : undefined);
  console.log(`[STORYBOOK] Page 4 illustration result - Success: ${image4.success}`, image4.success ? `Data length: ${isImageDataString(image4.data) ? image4.data.length : 'N/A'} chars` : `Error: ${image4.error}`);

  if (image4.success && isImageDataString(image4.data)) {
    console.log('[STORYBOOK] Uploading page 4 illustration');
    imageUrls.image4 = await uploadImageToStorage(image4.data, user_id, bookId, 'page4');
    console.log(`[DATABASE] Image4 URL: ${imageUrls.image4 || 'null'}`);
    if (imageUrls.image4) {
      try {
        console.log('[DATABASE] Updating book record with image4 URL');
        await supabase.from('books').update({ image4: imageUrls.image4 }).eq('id', bookId);
        console.log('[DATABASE] Book record updated with image4 URL');
      } catch (error) {
        console.error('[DATABASE ERROR] Error updating book with image4 URL:', error);
      }
    }
  }

  onProgress?.({
    step: 5,
    totalSteps,
    message: image4.success ? 'Page 4 illustration generated' : 'Failed to generate page 4 illustration',
    completed: true,
    data: image4.success ? { page: 4 } : undefined,
  });

  // Step 6: Generate page 5 image
  console.log('[STORYBOOK] Step 6: Generating page 5 illustration');
  onProgress?.({
    step: 6,
    totalSteps,
    message: 'Generating page 5 illustration...',
    completed: false,
  });

  const image5 = await executeStepN(6, teksCerita.data, image1.success && isImageDataString(image1.data) ? image1.data : undefined);
  console.log(`[STORYBOOK] Page 5 illustration result - Success: ${image5.success}`, image5.success ? `Data length: ${isImageDataString(image5.data) ? image5.data.length : 'N/A'} chars` : `Error: ${image5.error}`);

  if (image5.success && isImageDataString(image5.data)) {
    console.log('[STORYBOOK] Uploading page 5 illustration');
    imageUrls.image5 = await uploadImageToStorage(image5.data, user_id, bookId, 'page5');
    console.log(`[DATABASE] Image5 URL: ${imageUrls.image5 || 'null'}`);
    if (imageUrls.image5) {
      try {
        console.log('[DATABASE] Updating book record with image5 URL');
        await supabase.from('books').update({ image5: imageUrls.image5 }).eq('id', bookId);
        console.log('[DATABASE] Book record updated with image5 URL');
      } catch (error) {
        console.error('[DATABASE ERROR] Error updating book with image5 URL:', error);
      }
    }
  }

  onProgress?.({
    step: 6,
    totalSteps,
    message: image5.success ? 'Page 5 illustration generated' : 'Failed to generate page 5 illustration',
    completed: true,
    data: image5.success ? { page: 5 } : undefined,
  });

  // Step 7: Generate page 6 image
  console.log('[STORYBOOK] Step 7: Generating page 6 illustration');
  onProgress?.({
    step: 7,
    totalSteps,
    message: 'Generating page 6 illustration...',
    completed: false,
  });

  const image6 = await executeStepN(7, teksCerita.data, image1.success && isImageDataString(image1.data) ? image1.data : undefined);
  console.log(`[STORYBOOK] Page 6 illustration result - Success: ${image6.success}`, image6.success ? `Data length: ${isImageDataString(image6.data) ? image6.data.length : 'N/A'} chars` : `Error: ${image6.error}`);

  if (image6.success && isImageDataString(image6.data)) {
    console.log('[STORYBOOK] Uploading page 6 illustration');
    imageUrls.image6 = await uploadImageToStorage(image6.data, user_id, bookId, 'page6');
    console.log(`[DATABASE] Image6 URL: ${imageUrls.image6 || 'null'}`);
    if (imageUrls.image6) {
      try {
        console.log('[DATABASE] Updating book record with image6 URL');
        await supabase.from('books').update({ image6: imageUrls.image6 }).eq('id', bookId);
        console.log('[DATABASE] Book record updated with image6 URL');
      } catch (error) {
        console.error('[DATABASE ERROR] Error updating book with image6 URL:', error);
      }
    }
  }

  onProgress?.({
    step: 7,
    totalSteps,
    message: image6.success ? 'Page 6 illustration generated' : 'Failed to generate page 6 illustration',
    completed: true,
    data: image6.success ? { page: 6 } : undefined,
  });

  // Step 8: Generate page 7 image
  console.log('[STORYBOOK] Step 8: Generating page 7 illustration');
  onProgress?.({
    step: 8,
    totalSteps,
    message: 'Generating page 7 illustration...',
    completed: false,
  });

  const image7 = await executeStepN(8, teksCerita.data, image1.success && isImageDataString(image1.data) ? image1.data : undefined);
  console.log(`[STORYBOOK] Page 7 illustration result - Success: ${image7.success}`, image7.success ? `Data length: ${isImageDataString(image7.data) ? image7.data.length : 'N/A'} chars` : `Error: ${image7.error}`);

  if (image7.success && isImageDataString(image7.data)) {
    console.log('[STORYBOOK] Uploading page 7 illustration');
    imageUrls.image7 = await uploadImageToStorage(image7.data, user_id, bookId, 'page7');
    console.log(`[DATABASE] Image7 URL: ${imageUrls.image7 || 'null'}`);
    if (imageUrls.image7) {
      try {
        console.log('[DATABASE] Updating book record with image7 URL');
        await supabase.from('books').update({ image7: imageUrls.image7 }).eq('id', bookId);
        console.log('[DATABASE] Book record updated with image7 URL');
      } catch (error) {
        console.error('[DATABASE ERROR] Error updating book with image7 URL:', error);
      }
    }
  }

  onProgress?.({
    step: 8,
    totalSteps,
    message: image7.success ? 'Page 7 illustration generated' : 'Failed to generate page 7 illustration',
    completed: true,
    data: image7.success ? { page: 7 } : undefined,
  });

  // Step 9: Generate page 8 image
  console.log('[STORYBOOK] Step 9: Generating page 8 illustration');
  onProgress?.({
    step: 9,
    totalSteps,
    message: 'Generating page 8 illustration...',
    completed: false,
  });

  const image8 = await executeStepN(9, teksCerita.data, image1.success && isImageDataString(image1.data) ? image1.data : undefined);
  console.log(`[STORYBOOK] Page 8 illustration result - Success: ${image8.success}`, image8.success ? `Data length: ${isImageDataString(image8.data) ? image8.data.length : 'N/A'} chars` : `Error: ${image8.error}`);

  if (image8.success && isImageDataString(image8.data)) {
    console.log('[STORYBOOK] Uploading page 8 illustration');
    imageUrls.image8 = await uploadImageToStorage(image8.data, user_id, bookId, 'page8');
    console.log(`[DATABASE] Image8 URL: ${imageUrls.image8 || 'null'}`);
    if (imageUrls.image8) {
      try {
        console.log('[DATABASE] Updating book record with image8 URL');
        await supabase.from('books').update({ image8: imageUrls.image8 }).eq('id', bookId);
        console.log('[DATABASE] Book record updated with image8 URL');
      } catch (error) {
        console.error('[DATABASE ERROR] Error updating book with image8 URL:', error);
      }
    }
  }

  onProgress?.({
    step: 9,
    totalSteps,
    message: image8.success ? 'Page 8 illustration generated' : 'Failed to generate page 8 illustration',
    completed: true,
    data: image8.success ? { page: 8 } : undefined,
  });

  // Step 10: Generate page 9 image
  console.log('[STORYBOOK] Step 10: Generating page 9 illustration');
  onProgress?.({
    step: 10,
    totalSteps,
    message: 'Generating page 9 illustration...',
    completed: false,
  });

  const image9 = await executeStepN(10, teksCerita.data, image1.success && isImageDataString(image1.data) ? image1.data : undefined);
  console.log(`[STORYBOOK] Page 9 illustration result - Success: ${image9.success}`, image9.success ? `Data length: ${isImageDataString(image9.data) ? image9.data.length : 'N/A'} chars` : `Error: ${image9.error}`);

  if (image9.success && isImageDataString(image9.data)) {
    console.log('[STORYBOOK] Uploading page 9 illustration');
    imageUrls.image9 = await uploadImageToStorage(image9.data, user_id, bookId, 'page9');
    console.log(`[DATABASE] Image9 URL: ${imageUrls.image9 || 'null'}`);
    if (imageUrls.image9) {
      try {
        console.log('[DATABASE] Updating book record with image9 URL');
        await supabase.from('books').update({ image9: imageUrls.image9 }).eq('id', bookId);
        console.log('[DATABASE] Book record updated with image9 URL');
      } catch (error) {
        console.error('[DATABASE ERROR] Error updating book with image9 URL:', error);
      }
    }
  }

  onProgress?.({
    step: 10,
    totalSteps,
    message: image9.success ? 'Page 9 illustration generated' : 'Failed to generate page 9 illustration',
    completed: true,
    data: image9.success ? { page: 9 } : undefined,
  });

  // Step 11: Generate page 10 image
  console.log('[STORYBOOK] Step 11: Generating page 10 illustration');
  onProgress?.({
    step: 11,
    totalSteps,
    message: 'Generating page 10 illustration...',
    completed: false,
  });

  const image10 = await executeStepN(11, teksCerita.data, image1.success && isImageDataString(image1.data) ? image1.data : undefined);
  console.log(`[STORYBOOK] Page 10 illustration result - Success: ${image10.success}`, image10.success ? `Data length: ${isImageDataString(image10.data) ? image10.data.length : 'N/A'} chars` : `Error: ${image10.error}`);

  if (image10.success && isImageDataString(image10.data)) {
    console.log('[STORYBOOK] Uploading page 10 illustration');
    imageUrls.image10 = await uploadImageToStorage(image10.data, user_id, bookId, 'page10');
    console.log(`[DATABASE] Image10 URL: ${imageUrls.image10 || 'null'}`);
    if (imageUrls.image10) {
      try {
        console.log('[DATABASE] Updating book record with image10 URL');
        await supabase.from('books').update({ image10: imageUrls.image10 }).eq('id', bookId);
        console.log('[DATABASE] Book record updated with image10 URL');
      } catch (error) {
        console.error('[DATABASE ERROR] Error updating book with image10 URL:', error);
      }
    }
  }

  onProgress?.({
    step: 11,
    totalSteps,
    message: image10.success ? 'Page 10 illustration generated' : 'Failed to generate page 10 illustration',
    completed: true,
    data: image10.success ? { page: 10 } : undefined,
  });

  // Step 12: Generate cover image
  console.log('[STORYBOOK] Step 12: Generating cover illustration');
  onProgress?.({
    step: 12,
    totalSteps,
    message: 'Generating cover illustration...',
    completed: false,
  });

  const image0 = await executeStep12(teksCerita.data, image1.success && isImageDataString(image1.data) ? image1.data : undefined);
  console.log(`[STORYBOOK] Cover illustration result - Success: ${image0.success}`, image0.success ? `Data length: ${isImageDataString(image0.data) ? image0.data.length : 'N/A'} chars` : `Error: ${image0.error}`);

  if (image0.success && isImageDataString(image0.data)) {
    console.log('[STORYBOOK] Uploading cover illustration');
    imageUrls.cover = await uploadImageToStorage(image0.data, user_id, bookId, 'cover');
    console.log(`[DATABASE] Cover URL: ${imageUrls.cover || 'null'}`);
    if (imageUrls.cover) {
      try {
        console.log('[DATABASE] Updating book record with cover URL');
        await supabase.from('books').update({ cover: imageUrls.cover }).eq('id', bookId);
        console.log('[DATABASE] Book record updated with cover URL');
      } catch (error) {
        console.error('[DATABASE ERROR] Error updating book with cover URL:', error);
      }
    }
  }

  onProgress?.({
    step: 12,
    totalSteps,
    message: image0.success ? 'Cover illustration generated' : 'Failed to generate cover illustration',
    completed: true,
    data: image0.success ? { page: 'cover' } : undefined,
  });

  console.log('[STORYBOOK] Storybook creation completed successfully');
  console.log('[STORYBOOK] Final image URLs:', JSON.stringify(imageUrls, null, 2));

  // Return the result
  return {
    success: true,
    data: {
      story: teksCerita.data,
      images: {
        cover: imageUrls.cover,
        page1: imageUrls.image1,
        page2: imageUrls.image2,
        page3: imageUrls.image3,
        page4: imageUrls.image4,
        page5: imageUrls.image5,
        page6: imageUrls.image6,
        page7: imageUrls.image7,
        page8: imageUrls.image8,
        page9: imageUrls.image9,
        page10: imageUrls.image10,
      },
    },
  };
}
