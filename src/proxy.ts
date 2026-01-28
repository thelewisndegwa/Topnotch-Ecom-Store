/**
 * Next.js Proxy
 * 
 * Handles security headers, CORS, and request processing
 * Runs on the Edge Runtime for optimal performance
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const dev = process.env.NODE_ENV !== 'production';

/**
 * Get allowed origins from environment variable
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
 * Get Content Security Policy
 */
function getContentSecurityPolicy(): string {
  if (dev) {
    return "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;";
  }

  return process.env.CSP_HEADER || 
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';";
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const origin = request.headers.get('origin');

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Content-Security-Policy', getContentSecurityPolicy());
  response.headers.set(
    'Referrer-Policy',
    process.env.REFERRER_POLICY || 'strict-origin-when-cross-origin'
  );
  response.headers.set(
    'Permissions-Policy',
    process.env.PERMISSIONS_POLICY ||
      'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
  );
  response.headers.set('X-DNS-Prefetch-Control', 'off');

  // HSTS (HTTP Strict Transport Security) - Only in production/HTTPS
  // In development (localhost), browsers ignore HSTS
  if (!dev && request.nextUrl.protocol === 'https:') {
    const hstsMaxAge = process.env.HSTS_MAX_AGE || '31536000'; // 1 year
    const includeSubDomains = process.env.HSTS_INCLUDE_SUBDOMAINS !== 'false' ? '; includeSubDomains' : '';
    const preload = process.env.HSTS_PRELOAD === 'true' ? '; preload' : '';
    response.headers.set('Strict-Transport-Security', `max-age=${hstsMaxAge}${includeSubDomains}${preload}`);
  }

  // CORS handling for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    const allowedOrigins = getAllowedOrigins();

    if (origin && isOriginAllowed(origin, allowedOrigins)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    } else if (dev) {
      // In development, allow all origins
      response.headers.set('Access-Control-Allow-Origin', origin || '*');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    }

    response.headers.set(
      'Access-Control-Allow-Methods',
      process.env.CORS_ALLOWED_METHODS || 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    response.headers.set(
      'Access-Control-Allow-Headers',
      process.env.CORS_ALLOWED_HEADERS || 'Content-Type, Authorization, X-Requested-With'
    );
    response.headers.set(
      'Access-Control-Expose-Headers',
      process.env.CORS_EXPOSE_HEADERS || 'X-Request-Id, X-Response-Time'
    );

    const maxAge = dev ? '0' : process.env.CORS_MAX_AGE || '86400';
    response.headers.set('Access-Control-Max-Age', maxAge);

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers: response.headers });
    }
  }

  return response;
}

// Configure which routes the proxy runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
