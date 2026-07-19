'use server';
import { createClient } from '@/utils/supabase/server';

export async function getUserVideos() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching videos:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      videos: data,
    };
  } catch (error) {
    console.error('Error fetching videos:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while fetching videos',
    };
  }
}

export async function generateVideo(prompt: string, image?: File) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await (await supabase).auth.getUser();
  if (userError || !user) {
    throw new Error('Unauthorized');
  }

  try {
    // Create FormData to handle both text and image
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('user_id', user.id);

    // Append image if provided
    if (image) {
      formData.append('image', image);
    }

    // Call the video generation API with FormData
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/video/generate`, {
      method: 'POST',
      body: formData, // No need to set Content-Type header, it's automatically set with boundary
    });

    if (!response.ok) {
      throw new Error('Failed to generate video');
    }

    const result = await response.json();
    return { ...result };
  } catch (error) {
    console.error('Error generating video:', error);
    throw error;
  }
}

export async function getVideoById(id: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from('videos').select('*').eq('id', id);

    if (error) {
      console.error('Error fetching video:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      video: data[0],
    };
  } catch (error) {
    console.error('Error fetching video:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while fetching the video',
    };
  }
}

export async function getVideoByUser() {
  try {
    const supabase = await createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData) {
      throw new Error('Unauthorized');
    }

    const { data, error } = await supabase.from('videos').select('*').eq('user_id', userData.user.id);

    if (error) {
      console.error('Error fetching videos:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      videos: data,
    };
  } catch (error) {
    console.error('Error fetching videos:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while fetching the videos',
    };
  }
}
