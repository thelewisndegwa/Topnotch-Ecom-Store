/**
 * CORS Configuration
 * 
 * Production-ready CORS middleware with environment-based settings
 */

import type { Request, Response, NextFunction } from 'express';

const dev = process.env.NODE_ENV !== 'production';

/**
 * Get allowed origins from environment variable
 * Supports comma-separated list of origins
 */
function getAllowedOrigins(): string[] {
  const origins = process.env.ALLOWED_ORIGINS;
  
  if (!origins) {
    return dev ? ['http://localhost:3000', 'http://localhost:3001'] : [];
  }

  return origins.split(',').map((origin) => origin.trim()).filter(Boolean);
}

/**
 * Check if origin is allowed
 */
function isOriginAllowed(origin: string | undefined, allowedOrigins: string[]): boolean {
  if (!origin) {
    return false;
  }

  // In development, allow localhost with any port
  if (dev && origin.startsWith('http://localhost:')) {
    return true;
  }

  return allowedOrigins.includes(origin);
}

/**
 * CORS middleware with production-ready configuration
 */
export function corsMiddleware(req: Request, res: Response, next: NextFunction): void {
  const allowedOrigins = getAllowedOrigins();
  const origin = req.headers.origin;

  // Check if origin is allowed
  if (origin && isOriginAllowed(origin, allowedOrigins)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else if (dev) {
    // In development, allow all origins
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else {
    // In production, reject unauthorized origins
    if (origin) {
      res.status(403).json({
        success: false,
        error: 'Origin not allowed',
      });
      return;
    }
  }

  // Set CORS headers
  res.setHeader(
    'Access-Control-Allow-Methods',
    process.env.CORS_ALLOWED_METHODS || 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    process.env.CORS_ALLOWED_HEADERS || 'Content-Type, Authorization, X-Requested-With'
  );

  res.setHeader(
    'Access-Control-Expose-Headers',
    process.env.CORS_EXPOSE_HEADERS || 'X-Request-Id, X-Response-Time'
  );

  // Set preflight cache duration (24 hours in production, 0 in dev)
  const maxAge = dev ? '0' : process.env.CORS_MAX_AGE || '86400';
  res.setHeader('Access-Control-Max-Age', maxAge);

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  next();
}

/**
 * Get CORS configuration for documentation
 */
export function getCorsConfig() {
  return {
    allowedOrigins: getAllowedOrigins(),
    allowedMethods: process.env.CORS_ALLOWED_METHODS || 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS || 'Content-Type, Authorization, X-Requested-With',
    maxAge: process.env.CORS_MAX_AGE || '86400',
    credentials: true,
  };
}
