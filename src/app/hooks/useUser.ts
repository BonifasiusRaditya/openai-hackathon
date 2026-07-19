'use client';
import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
  const supabase = createClient();

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Error fetching user:', error);
          return null;
        }
        return data.user;
      } catch (error) {
        console.error('Unexpected error:', error);
        return null;
      }
    },
  });

  return {
    user,
    isLoading,
  };
}
