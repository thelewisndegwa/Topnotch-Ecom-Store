/**
 * Security Headers Configuration
 * 
 * Production-ready security headers middleware
 */

import type { Request, Response, NextFunction } from 'express';

const dev = process.env.NODE_ENV !== 'production';

/**
 * Content Security Policy
 * Configure based on your needs
 */
const getContentSecurityPolicy = (): string => {
  if (dev) {
    // More permissive in development
    return "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;";
  }

  // Strict CSP for production
  return process.env.CSP_HEADER || 
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';";
};

/**
 * Security headers middleware
 */
export function securityHeadersMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // XSS Protection (legacy, but still useful)
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Content Security Policy
  res.setHeader('Content-Security-Policy', getContentSecurityPolicy());

  // Referrer Policy
  res.setHeader(
    'Referrer-Policy',
    process.env.REFERRER_POLICY || 'strict-origin-when-cross-origin'
  );

  // Permissions Policy (formerly Feature-Policy)
  res.setHeader(
    'Permissions-Policy',
    process.env.PERMISSIONS_POLICY ||
      'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
  );

  // Strict Transport Security (HSTS) - only in production with HTTPS
  if (!dev && req.secure) {
    const maxAge = process.env.HSTS_MAX_AGE || '31536000'; // 1 year
    const includeSubDomains = process.env.HSTS_INCLUDE_SUBDOMAINS !== 'false';
    const preload = process.env.HSTS_PRELOAD === 'true';

    let hstsValue = `max-age=${maxAge}`;
    if (includeSubDomains) {
      hstsValue += '; includeSubDomains';
    }
    if (preload) {
      hstsValue += '; preload';
    }

    res.setHeader('Strict-Transport-Security', hstsValue);
  }

  // X-DNS-Prefetch-Control
  res.setHeader('X-DNS-Prefetch-Control', 'off');

  // Expect-CT (Certificate Transparency)
  if (!dev) {
    res.setHeader(
      'Expect-CT',
      process.env.EXPECT_CT_HEADER || 'max-age=86400, enforce'
    );
  }

  // Remove X-Powered-By header (security through obscurity)
  res.removeHeader('X-Powered-By');

  next();
}

/**
 * Rate limiting helper (basic implementation)
 * For production, consider using express-rate-limit
 */
export function createRateLimitMiddleware(
  windowMs: number = 15 * 60 * 1000, // 15 minutes
  maxRequests: number = 100
) {
  const requests = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, res: Response, next: NextFunction): void => {
    const clientId = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const clientData = requests.get(clientId);

    // Clean up old entries
    if (clientData && now > clientData.resetTime) {
      requests.delete(clientId);
    }

    const current = requests.get(clientId);

    if (!current || now > current.resetTime) {
      requests.set(clientId, {
        count: 1,
        resetTime: now + windowMs,
      });
      return next();
    }

    if (current.count >= maxRequests) {
      res.status(429).json({
        success: false,
        error: 'Too many requests',
        retryAfter: Math.ceil((current.resetTime - now) / 1000),
      });
      return;
    }

    current.count++;
    next();
  };
}
