import { NextRequest, NextResponse } from 'next/server';
import { books } from '@/data/books';

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * GET /api/v1/books/[id]
 * Returns a specific book by ID
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    // Support both slug and id lookup (books use slug as identifier)
    const book = books.find((b) => b.slug === id);

    if (!book) {
      return NextResponse.json(
        {
          success: false,
          error: 'Book not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: book,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch book',
      },
      { status: 500 }
    );
  }
}
