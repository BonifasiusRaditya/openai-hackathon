import { NextRequest, NextResponse } from 'next/server';
import { getBookById } from '@/app/actions/books';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Book ID is required' }, { status: 400 });
    }

    const result = await getBookById(id);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 404 });
    }

    return NextResponse.json({ success: true, book: result.book }, { status: 200 });
  } catch (error) {
    console.error('Error in book details API route:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
