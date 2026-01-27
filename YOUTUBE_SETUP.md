# YouTube Integration Setup

The videos page is configured to fetch videos from the Topnotch Online TV YouTube channel (`@TopnotchonlineTV`).

## How It Works

The system uses a three-tier fallback approach:

1. **YouTube Data API v3** (Recommended)
   - Requires a YouTube API key
   - Fetches the latest videos directly from YouTube
   - Most reliable and up-to-date

2. **RSS Feed** (Fallback)
   - Attempts to parse YouTube RSS feed
   - No API key required
   - May not work for all channels

3. **Static Video List** (Final Fallback)
   - Uses videos from `src/data/videos.ts`
   - Always works, but requires manual updates

## Setup Instructions

### Option 1: YouTube Data API (Recommended)

1. **Get a YouTube Data API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the "YouTube Data API v3"
   - Create credentials (API Key)
   - Copy your API key

2. **Add API Key to Environment:**
   ```bash
   # Add to .env file
   YOUTUBE_API_KEY=your_api_key_here
   ```

3. **Restart the server:**
   ```bash
   npm run dev
   ```

The system will automatically fetch the latest videos from the channel.

### Option 2: Manual Video IDs

If you prefer to manually manage videos, update `src/data/videos.ts` with actual video IDs from the channel:

```typescript
export const videos: Video[] = [
  {
    id: "ACTUAL_VIDEO_ID_1", // Replace with real YouTube video ID
    title: "KCSE Mathematics Revision – Quadratic Equations",
    description: "A clear breakdown of quadratic equations...",
  },
  // Add more videos...
];
```

To get video IDs:
1. Go to the YouTube video
2. Copy the ID from the URL: `https://www.youtube.com/watch?v=VIDEO_ID_HERE`

### Option 3: Channel ID for RSS Feed

If you know the channel ID, you can update the RSS feed URL in `src/app/api/v1/youtube/route.ts`:

```typescript
const channelId = 'YOUR_CHANNEL_ID_HERE';
const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
```

## Testing

1. Visit `/videos` page
2. Check browser console for any errors
3. Videos should load automatically if API key is set
4. If no API key, static videos from `src/data/videos.ts` will be shown

## API Endpoint

The videos are fetched from: `GET /api/v1/youtube`

This endpoint:
- Returns the latest videos from the channel
- Caches results for 1 hour (revalidation)
- Falls back gracefully if API/RSS fails

## Troubleshooting

**No videos showing:**
- Check if `YOUTUBE_API_KEY` is set correctly
- Verify the channel handle is correct: `@TopnotchonlineTV`
- Check server logs for API errors
- Ensure static videos exist in `src/data/videos.ts` as fallback

**API quota exceeded:**
- YouTube Data API has daily quotas
- Consider using RSS feed or static list
- Or upgrade your Google Cloud plan

**RSS feed not working:**
- RSS feeds may not be available for all channels
- Use YouTube Data API instead
- Or manually update video IDs
