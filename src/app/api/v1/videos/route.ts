import { NextRequest, NextResponse } from 'next/server';
import { videos } from '@/data/videos';

/**
 * GET /api/v1/videos
 * Returns all videos
 */
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      {
        success: true,
        data: videos,
        count: videos.length,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch videos',
      },
      { status: 500 }
    );
  }
}
