import { NextRequest, NextResponse } from 'next/server';
import { blogPosts } from '@/data/blog';

/**
 * GET /api/v1/blog
 * Returns all blog posts
 */
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      {
        success: true,
        data: blogPosts,
        count: blogPosts.length,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch blog posts',
      },
      { status: 500 }
    );
  }
}
