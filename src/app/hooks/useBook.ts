'use client';

import { useQuery } from '@tanstack/react-query';

interface Book {
  id: number;
  created_at: string;
  title: string;
  theme: string;
  cover: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  image7?: string;
  image8?: string;
  image9?: string;
  image10?: string;
  user_id: string;
}

export function useBook(id: string | number) {
  const { data, isLoading, error } = useQuery<{
    success: boolean;
    book?: Book;
    error?: string;
  }>({
    queryKey: ['book', id],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/books/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book');
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching book:', error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
      }
    },
    enabled: !!id,
  });

  return {
    book: data?.book,
    isLoading,
    error: data?.error || error,
  };
}
