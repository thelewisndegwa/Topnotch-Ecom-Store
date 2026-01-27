import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/v1/youtube
 * Fetches videos from Topnotch Online TV YouTube channel
 * 
 * Options:
 * 1. Uses YouTube Data API v3 (requires YOUTUBE_API_KEY env var)
 * 2. Falls back to RSS feed parsing
 * 3. Falls back to static video list
 */
export async function GET(request: NextRequest) {
  try {
    const channelHandle = '@TopnotchonlineTV';
    const apiKey = process.env.YOUTUBE_API_KEY;
    
    // Method 1: Use YouTube Data API if key is available
    if (apiKey) {
      try {
        const videos = await fetchFromYouTubeAPI(channelHandle, apiKey);
        if (videos.length > 0) {
          return NextResponse.json(
            {
              success: true,
              data: videos,
              count: videos.length,
            },
            { status: 200 }
          );
        }
      } catch (error) {
        console.error('YouTube API error:', error);
      }
    }

    // Method 2: Try RSS feed
    try {
      const videos = await fetchFromRSSFeed(channelHandle);
      if (videos.length > 0) {
        return NextResponse.json(
          {
            success: true,
            data: videos,
            count: videos.length,
          },
          { status: 200 }
        );
      }
    } catch (error) {
      console.error('RSS feed error:', error);
    }

    // Method 3: Fallback to static videos from data file
    const { videos: staticVideos } = await import('@/data/videos');
    return NextResponse.json(
      {
        success: true,
        data: staticVideos,
        count: staticVideos.length,
        note: 'Using static video list. Set YOUTUBE_API_KEY to fetch live videos.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch videos',
        data: [],
      },
      { status: 500 }
    );
  }
}

/**
 * Fetch videos using YouTube Data API v3
 */
async function fetchFromYouTubeAPI(channelHandle: string, apiKey: string) {
  // First, get channel ID from handle
  const channelResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(channelHandle)}&type=channel&key=${apiKey}`
  );

  if (!channelResponse.ok) {
    throw new Error('Failed to fetch channel');
  }

  const channelData = await channelResponse.json();
  const channelId = channelData.items?.[0]?.id?.channelId;

  if (!channelId) {
    throw new Error('Channel not found');
  }

  // Get uploads playlist ID
  const channelDetailsResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
  );

  if (!channelDetailsResponse.ok) {
    throw new Error('Failed to fetch channel details');
  }

  const channelDetails = await channelDetailsResponse.json();
  const uploadsPlaylistId = channelDetails.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

  if (!uploadsPlaylistId) {
    throw new Error('Uploads playlist not found');
  }

  // Get videos from uploads playlist
  const videosResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=20&key=${apiKey}`
  );

  if (!videosResponse.ok) {
    throw new Error('Failed to fetch videos');
  }

  const videosData = await videosResponse.json();

  return videosData.items.map((item: any) => ({
    id: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    description: item.snippet.description?.substring(0, 150) + '...' || '',
    publishedAt: item.snippet.publishedAt,
    thumbnail: item.snippet.thumbnails?.maxres?.url || item.snippet.thumbnails?.high?.url || '',
  }));
}

/**
 * Fetch videos from YouTube RSS feed
 */
async function fetchFromRSSFeed(channelHandle: string) {
  // Try different RSS feed formats
  const rssUrls = [
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelHandle.replace('@', '')}`,
    `https://www.youtube.com/feeds/videos.xml?user=${channelHandle.replace('@', '')}`,
  ];

  for (const rssUrl of rssUrls) {
    try {
      const response = await fetch(rssUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });

      if (response.ok) {
        const feedData = await response.text();
        const videos = parseYouTubeRSS(feedData);
        if (videos.length > 0) {
          return videos;
        }
      }
    } catch (error) {
      continue;
    }
  }

  return [];
}

/**
 * Parse YouTube RSS feed XML and extract video information
 */
function parseYouTubeRSS(xml: string): Array<{
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
}> {
  const videos: Array<{
    id: string;
    title: string;
    description: string;
    publishedAt: string;
    thumbnail: string;
  }> = [];

  try {
    // Extract video entries using regex (simple parser)
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;

    while ((match = entryRegex.exec(xml)) !== null) {
      const entry = match[1];
      
      // Extract video ID from yt:videoId or link
      const videoIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || 
                          entry.match(/<link[^>]*href="[^"]*[?&]v=([^"&]+)/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;

      if (!videoId) continue;

      // Extract title
      const titleMatch = entry.match(/<title[^>]*>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1] : 'Untitled';

      // Extract description
      const descMatch = entry.match(/<media:description[^>]*>([^<]+)<\/media:description>/) ||
                       entry.match(/<summary[^>]*>([^<]+)<\/summary>/);
      const description = descMatch ? descMatch[1].substring(0, 150) + '...' : '';

      // Extract published date
      const dateMatch = entry.match(/<published>([^<]+)<\/published>/);
      const publishedAt = dateMatch ? dateMatch[1] : '';

      // Generate thumbnail URL
      const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

      videos.push({
        id: videoId,
        title: title.trim(),
        description: description.trim(),
        publishedAt,
        thumbnail,
      });
    }
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
  }

  return videos;
}
