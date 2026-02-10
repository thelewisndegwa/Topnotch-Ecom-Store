/**
 * Next.js Proxy
 *
 * Applies security headers to all requests.
 * Runs on the Edge Runtime.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const dev = process.env.NODE_ENV !== 'production';

function getCsp(): string {
  if (dev) {
    return "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;";
  }
  return process.env.CSP_HEADER ||
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';";
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Content-Security-Policy', getCsp());
  response.headers.set('Referrer-Policy', process.env.REFERRER_POLICY || 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    process.env.PERMISSIONS_POLICY ||
      'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
  );
  response.headers.set('X-DNS-Prefetch-Control', 'off');

  if (!dev && request.nextUrl.protocol === 'https:') {
    const hstsMaxAge = process.env.HSTS_MAX_AGE || '31536000';
    const includeSubDomains = process.env.HSTS_INCLUDE_SUBDOMAINS !== 'false' ? '; includeSubDomains' : '';
    const preload = process.env.HSTS_PRELOAD === 'true' ? '; preload' : '';
    response.headers.set('Strict-Transport-Security', `max-age=${hstsMaxAge}${includeSubDomains}${preload}`);
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
