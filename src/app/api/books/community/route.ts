import { NextResponse } from 'next/server';
import { getAllBooks } from '@/app/actions/books';

export async function GET() {
  try {
    const result = await getAllBooks();

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, books: result.books }, { status: 200 });
  } catch (error) {
    console.error('Error in community books API route:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
