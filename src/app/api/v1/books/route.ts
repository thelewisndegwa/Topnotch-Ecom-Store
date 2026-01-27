import { NextRequest, NextResponse } from 'next/server';
import { books } from '@/data/books';
import { getApiPath } from '@/routes';

/**
 * GET /api/v1/books
 * Returns all books
 */
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      {
        success: true,
        data: books,
        count: books.length,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch books',
      },
      { status: 500 }
    );
  }
}
