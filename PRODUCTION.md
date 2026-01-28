# Production Setup Guide

This document outlines the production-ready features implemented for Next.js/Vercel deployment.

## Features

### 1. CORS Configuration (Next.js Middleware)

Production-ready CORS handling via Next.js middleware (`src/middleware.ts`):
- Environment-based origin whitelisting
- Configurable allowed methods and headers
- Preflight request handling
- Credentials support
- Development mode with localhost support

**Environment Variables:**
- `ALLOWED_ORIGINS`: Comma-separated list of allowed origins (required in production)
- `CORS_ALLOWED_METHODS`: Allowed HTTP methods (default: GET, POST, PUT, PATCH, DELETE, OPTIONS)
- `CORS_ALLOWED_HEADERS`: Allowed request headers
- `CORS_EXPOSE_HEADERS`: Headers exposed to the client
- `CORS_MAX_AGE`: Preflight cache duration in seconds (default: 86400)

### 2. Security Headers (Next.js Middleware)

Comprehensive security headers via Next.js middleware:
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-Frame-Options**: Prevents clickjacking (DENY)
- **X-XSS-Protection**: Legacy XSS protection
- **Content-Security-Policy**: Configurable CSP
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Controls browser features
- **X-DNS-Prefetch-Control**: DNS prefetch control

**Environment Variables:**
- `CSP_HEADER`: Custom Content Security Policy
- `REFERRER_POLICY`: Referrer policy (default: strict-origin-when-cross-origin)
- `PERMISSIONS_POLICY`: Permissions policy string

### 3. Structured Logging (`src/lib/logger.ts`)

Production-ready logging system with:
- Structured JSON output (production) or pretty-printed (development)
- Log levels: DEBUG, INFO, WARN, ERROR
- Request logging with metadata (method, path, status, duration, IP, user agent)
- Error logging with stack traces (development only)
- Request ID tracking for distributed tracing

**Environment Variables:**
- `LOG_LEVEL`: Logging level (DEBUG, INFO, WARN, ERROR) - default: INFO in production, DEBUG in development

**Features:**
- Automatic request ID generation and tracking
- Duration tracking for performance monitoring
- Error context preservation
- Production-optimized JSON output for log aggregation tools (Vercel Logs)

### 4. Enhanced Health Check (`src/app/api/v1/health/route.ts`)

Comprehensive health check endpoint with:
- System uptime (formatted and in seconds)
- Memory usage metrics (RSS, heap total, heap used, external)
- Memory usage percentage and status (normal/high/critical)
- Environment information
- Application version
- Health status (healthy/degraded)
- HTTP 503 response if unhealthy (memory > 90%)

**Endpoint:** `GET /api/v1/health`

**Response Example:**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "v1",
  "uptime": {
    "seconds": 3600,
    "formatted": "1h 0m 0s"
  },
  "memory": {
    "rss": 50.25,
    "heapTotal": 20.5,
    "heapUsed": 15.3,
    "external": 2.1
  },
  "memoryUsage": {
    "percent": 75,
    "status": "normal"
  },
  "environment": "production",
  "appVersion": "1.0.0"
}
```

## Configuration

### Environment Variables

Set these in your Vercel project settings or `.env.local`:

```bash
# Required in production
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Optional - customize as needed
LOG_LEVEL=INFO
CORS_MAX_AGE=86400
CSP_HEADER=default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
```

### Configuration Validation

The configuration validates required settings. In production, `ALLOWED_ORIGINS` should be set for proper CORS handling.

## Production Deployment (Vercel)

### 1. Build the Application

```bash
npm run build
```

### 2. Set Environment Variables

In Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add all required variables

### 3. Deploy

Vercel automatically:
- Builds the application
- Runs the build command
- Deploys to production
- Handles serverless function execution

### 4. Health Check

Monitor the health endpoint:
```bash
curl https://yourdomain.com/api/v1/health
```

## Monitoring

### Logs

In Vercel production, logs are available in:
- Vercel Dashboard → Logs tab
- Structured JSON format for log aggregation
- Real-time log streaming

### Metrics

The health check endpoint provides:
- Memory usage trends
- Uptime tracking
- System health status

### Request Tracking

Every request can include a `X-Request-Id` header for distributed tracing (handled by middleware).

## Security Best Practices

1. **Always set `ALLOWED_ORIGINS` in production** - Never use wildcard (`*`) in production
2. **Use HTTPS** - Vercel automatically provides HTTPS
3. **Review CSP policy** - Customize based on your application needs
4. **Regular security audits** - Keep dependencies updated
5. **Use Vercel's built-in security features** - DDoS protection, edge network, etc.

## Troubleshooting

### CORS Errors

- Verify `ALLOWED_ORIGINS` includes your frontend domain
- Check that credentials are properly configured
- Review browser console for specific CORS errors
- Ensure middleware is running (check Vercel logs)

### High Memory Usage

- Monitor `/api/v1/health` endpoint
- Review memory metrics in Vercel dashboard
- Check serverless function logs for memory issues
- Consider optimizing API routes if needed

### Build Failures

- Check that all Express/server dependencies are removed
- Verify TypeScript compilation: `npx tsc --noEmit`
- Review build logs in Vercel dashboard
- Ensure all API routes use Next.js App Router conventions

## Next.js App Router

This application uses Next.js 16 App Router:
- API routes: `src/app/api/**/route.ts`
- Pages: `src/app/**/page.tsx`
- Middleware: `src/middleware.ts`
- No custom server needed - Vercel handles everything
