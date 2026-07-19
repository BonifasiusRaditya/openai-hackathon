'use server';
import { createClient } from '@/utils/supabase/server';

export async function getUserBooks() {
  try {
    const supabase = await createClient();

    // First get the current user
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error('Error getting user:', userError);
      return {
        success: false,
        error: userError.message,
      };
    }

    if (!userData.user) {
      return {
        success: false,
        error: 'No authenticated user found',
      };
    }

    // Then fetch the books for this user
    const { data, error } = await supabase.from('books').select('*').eq('user_id', userData.user.id).order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching books:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      books: data,
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while fetching books',
    };
  }
}

export async function saveStorybook(storyData: { title: string; theme: string; cover: string; image1?: string; image2?: string; image3?: string; image4?: string; image5?: string; image6?: string; image7?: string; image8?: string; image9?: string; image10?: string }) {
  try {
    const supabase = await createClient();

    // Get the current user
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error('Error getting user:', userError);
      return {
        success: false,
        error: userError.message,
      };
    }

    if (!userData.user) {
      return {
        success: false,
        error: 'No authenticated user found',
      };
    }

    // Save the book to the database
    const { data, error } = await supabase
      .from('books')
      .insert({
        title: storyData.title,
        theme: storyData.theme,
        cover: storyData.cover,
        image1: storyData.image1 || null,
        image2: storyData.image2 || null,
        image3: storyData.image3 || null,
        image4: storyData.image4 || null,
        image5: storyData.image5 || null,
        image6: storyData.image6 || null,
        image7: storyData.image7 || null,
        image8: storyData.image8 || null,
        image9: storyData.image9 || null,
        image10: storyData.image10 || null,
        user_id: userData.user.id,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving book:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      book: data,
    };
  } catch (error) {
    console.error('Error saving book:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while saving the book',
    };
  }
}

export async function getAllBooks() {
  try {
    const supabase = await createClient();

    // Fetch all books ordered by creation date, latest first
    const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching community books:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      books: data,
    };
  } catch (error) {
    console.error('Error fetching community books:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while fetching community books',
    };
  }
}

export async function getBookById(id: string | number) {
  try {
    const supabase = await createClient();

    // Fetch the specific book by id
    const { data, error } = await supabase.from('books').select('*').eq('id', id).single();

    if (error) {
      console.error('Error fetching book:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      book: data,
    };
  } catch (error) {
    console.error('Error fetching book:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while fetching the book',
    };
  }
}
