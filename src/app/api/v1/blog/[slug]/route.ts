import { NextRequest, NextResponse } from 'next/server';
import { blogPosts } from '@/data/blog';

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * GET /api/v1/blog/[slug]
 * Returns a specific blog post by slug
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          error: 'Blog post not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: post,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch blog post',
      },
      { status: 500 }
    );
  }
}
