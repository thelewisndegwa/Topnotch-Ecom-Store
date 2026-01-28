# Vercel Deployment Guide

This project has been refactored to work seamlessly with Vercel's serverless environment.

## Changes Made

### 1. Removed Express Server
- ✅ Deleted `src/server.ts` (custom Express server)
- ✅ Deleted `src/app.ts` (Express app configuration)
- ✅ Removed Express dependencies from `package.json`

### 2. Updated Package.json
- ✅ Removed `express` and `@types/express` dependencies
- ✅ Removed `tsx` dependency (not needed for Vercel)
- ✅ Updated scripts:
  - `dev`: Uses `next dev` (standard Next.js dev server)
  - `build`: Uses `next build` (standard Next.js build)
  - `start`: Uses `next start` (standard Next.js production server)
- ✅ Removed custom server scripts (`dev:server`, custom `start`)

### 3. Created Next.js Middleware
- ✅ Created `src/middleware.ts` for:
  - Security headers (CSP, X-Frame-Options, etc.)
  - CORS handling for API routes
  - Request processing
- ✅ Runs on Edge Runtime for optimal performance

### 4. Updated Library Files
- ✅ Updated `src/lib/config.ts` - Removed Express-specific config
- ✅ Updated `src/lib/logger.ts` - Works in serverless environment
- ✅ Deleted `src/lib/cors.ts` - Handled by middleware now
- ✅ Deleted `src/lib/security.ts` - Handled by middleware now

### 5. API Routes
- ✅ All API routes already use Next.js App Router conventions
- ✅ Routes are in `src/app/api/v1/*/route.ts` format
- ✅ No changes needed - they work independently

## Deployment Steps

1. **Push to Git**: Ensure all changes are committed and pushed
2. **Connect to Vercel**: 
   - Import your Git repository in Vercel
   - Vercel will auto-detect Next.js
3. **Environment Variables** (optional):
   - `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins
   - `CSP_HEADER`: Custom Content Security Policy
   - `LOG_LEVEL`: Logging level (DEBUG, INFO, WARN, ERROR)
4. **Deploy**: Vercel will automatically build and deploy

## Build Verification

The project should build successfully with:
```bash
npm run build
```

## Key Differences from Express Setup

| Express Setup | Vercel/Next.js Setup |
|--------------|---------------------|
| Custom Express server | Next.js built-in server |
| `app.listen(port)` | Automatic (Vercel handles) |
| Express middleware | Next.js middleware |
| Custom routing | Next.js App Router |
| Manual CORS setup | Middleware handles CORS |

## Notes

- All API routes work independently - no Express server needed
- Middleware runs on Edge Runtime for better performance
- Security headers are applied automatically via middleware
- CORS is handled per-request in middleware
- Logging works in serverless environment (uses console)

## Troubleshooting

If you encounter issues:

1. **Build fails**: Check that all Express imports are removed
2. **CORS errors**: Verify `ALLOWED_ORIGINS` environment variable
3. **TypeScript errors**: Run `npx tsc --noEmit` to check types
4. **API routes not working**: Ensure routes are in `app/api/**/route.ts` format
