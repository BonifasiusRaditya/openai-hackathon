'use server';

import { createClient } from '@/utils/supabase/server';

export async function anonymousLogin(userType: 'kids' | 'teens') {
  try {
    const supabase = await createClient();

    // Generate a random display name for demo purposes
    const randomNames = {
      kids: ['Alex Kid', 'Sam Student', 'Riley Learner', 'Jamie Junior'],
      teens: ['Taylor Teen', 'Morgan Young', 'Casey Cool', 'Jordan Smart'],
    };

    const nameList = randomNames[userType];
    const randomName = nameList[Math.floor(Math.random() * nameList.length)];

    // Sign in anonymously
    const { data, error } = await supabase.auth.signInAnonymously({
      options: {
        data: {
          user_type: userType,
          full_name: randomName,
          is_anonymous: true,
        },
      },
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      userId: data.user?.id,
      userType: userType,
    };
  } catch (error) {
    console.error('Anonymous login error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred during login',
    };
  }
}

export async function login(formData: FormData) {
  try {
    const supabase = await createClient();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return {
        success: false,
        error: 'Email and password are required',
      };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      userId: data.user?.id,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred during login',
    };
  }
}

export async function register(formData: FormData) {
  try {
    const supabase = await createClient();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const full_name = formData.get('full_name') as string;
    const user_type = formData.get('user_type') as 'teens' | 'kids';

    if (!email || !password || !full_name || !user_type) {
      return {
        success: false,
        error: 'Email, password, full name, and user type are required',
      };
    }

    if (user_type !== 'teens' && user_type !== 'kids') {
      return {
        success: false,
        error: 'Invalid user type selected.',
      };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          user_type,
        },
      },
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      userId: data.user?.id,
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred during registration',
    };
  }
}

export async function resetPassword(formData: FormData) {
  try {
    const supabase = await createClient();
    const email = formData.get('email') as string;

    if (!email) {
      return {
        success: false,
        error: 'Email is required',
      };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Password reset error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while sending reset link',
    };
  }
}
