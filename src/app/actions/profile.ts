'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    const full_name = formData.get('full_name') as string;
    const avatar_url = formData.get('avatar_url') as string;

    if (!full_name) {
      return {
        success: false,
        error: 'Full name is required',
      };
    }

    // Update user metadata
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name,
        avatar_url: avatar_url || user.user_metadata.avatar_url,
      },
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    // Revalidate the profile page to reflect changes
    revalidatePath('/dashboard/profile');

    return {
      success: true,
      message: 'Profile updated successfully',
    };
  } catch (error) {
    console.error('Profile update error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while updating profile',
    };
  }
}

export async function updateEmail(formData: FormData) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    const email = formData.get('email') as string;

    if (!email) {
      return {
        success: false,
        error: 'Email is required',
      };
    }

    // Check if email is different from current
    if (email === user.email) {
      return {
        success: false,
        error: 'New email must be different from current email',
      };
    }

    // Update user email (this will trigger a confirmation email)
    const { error } = await supabase.auth.updateUser({
      email,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      message: 'Email update confirmation has been sent to your new email address',
    };
  } catch (error) {
    console.error('Email update error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while updating email',
    };
  }
}

export async function updatePassword(formData: FormData) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    const current_password = formData.get('current_password') as string;
    const new_password = formData.get('new_password') as string;
    const confirm_password = formData.get('confirm_password') as string;

    if (!current_password || !new_password || !confirm_password) {
      return {
        success: false,
        error: 'All password fields are required',
      };
    }

    if (new_password !== confirm_password) {
      return {
        success: false,
        error: 'New passwords do not match',
      };
    }

    if (new_password.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters long',
      };
    }

    // Update user password
    const { error } = await supabase.auth.updateUser({
      password: new_password,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      message: 'Password updated successfully',
    };
  } catch (error) {
    console.error('Password update error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while updating password',
    };
  }
}
