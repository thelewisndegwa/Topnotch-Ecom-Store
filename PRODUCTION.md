# Production Setup Guide

This document outlines the production-ready features implemented in the backend.

## Features

### 1. CORS Configuration (`src/lib/cors.ts`)

Production-ready CORS middleware with:
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

### 2. Security Headers (`src/lib/security.ts`)

Comprehensive security headers including:
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-Frame-Options**: Prevents clickjacking (DENY)
- **X-XSS-Protection**: Legacy XSS protection
- **Content-Security-Policy**: Configurable CSP
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Controls browser features
- **Strict-Transport-Security**: HSTS for HTTPS (production only)
- **Expect-CT**: Certificate Transparency
- **X-DNS-Prefetch-Control**: DNS prefetch control

**Environment Variables:**
- `CSP_HEADER`: Custom Content Security Policy
- `REFERRER_POLICY`: Referrer policy (default: strict-origin-when-cross-origin)
- `PERMISSIONS_POLICY`: Permissions policy string
- `HSTS_MAX_AGE`: HSTS max age in seconds (default: 31536000)
- `HSTS_INCLUDE_SUBDOMAINS`: Include subdomains in HSTS (default: true)
- `HSTS_PRELOAD`: Enable HSTS preload (default: false)

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
- Production-optimized JSON output for log aggregation tools

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

### 5. Rate Limiting (`src/lib/security.ts`)

Basic rate limiting middleware:
- Configurable window and max requests
- Per-IP tracking
- Automatic cleanup of expired entries
- Health check endpoint excluded

**Environment Variables:**
- `RATE_LIMIT_WINDOW_MS`: Time window in milliseconds (default: 900000 = 15 minutes)
- `RATE_LIMIT_MAX_REQUESTS`: Maximum requests per window (default: 100)

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Required in production
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Optional - customize as needed
LOG_LEVEL=INFO
RATE_LIMIT_MAX_REQUESTS=100
CORS_MAX_AGE=86400
```

### Configuration Validation

The server validates required configuration on startup. In production, `ALLOWED_ORIGINS` must be set.

## Production Deployment

### 1. Build the Application

```bash
npm run build
```

### 2. Set Environment Variables

Ensure all required environment variables are set in your production environment.

### 3. Start the Server

```bash
npm start
```

### 4. Health Check

Monitor the health endpoint:
```bash
curl https://yourdomain.com/api/v1/health
```

## Monitoring

### Logs

In production, logs are output as structured JSON, suitable for:
- Log aggregation tools (ELK, Datadog, etc.)
- Cloud logging services (CloudWatch, Stackdriver, etc.)
- Log analysis platforms

### Metrics

The health check endpoint provides:
- Memory usage trends
- Uptime tracking
- System health status

### Request Tracking

Every request includes a `X-Request-Id` header for distributed tracing.

## Security Best Practices

1. **Always set `ALLOWED_ORIGINS` in production** - Never use wildcard (`*`) in production
2. **Use HTTPS** - Required for HSTS and secure cookies
3. **Review CSP policy** - Customize based on your application needs
4. **Monitor rate limits** - Adjust based on your traffic patterns
5. **Regular security audits** - Keep dependencies updated

## Troubleshooting

### CORS Errors

- Verify `ALLOWED_ORIGINS` includes your frontend domain
- Check that credentials are properly configured
- Review browser console for specific CORS errors

### High Memory Usage

- Monitor `/api/v1/health` endpoint
- Review memory metrics
- Consider increasing server resources if consistently > 80%

### Rate Limiting Issues

- Adjust `RATE_LIMIT_MAX_REQUESTS` based on legitimate traffic
- Review logs for rate limit violations
- Consider per-endpoint rate limits for high-traffic routes
