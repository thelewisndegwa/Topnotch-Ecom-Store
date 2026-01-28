/**
 * Configuration Management
 * 
 * Centralized configuration with environment variable validation
 * Updated for Next.js/Vercel deployment (no Express server)
 */

const dev = process.env.NODE_ENV !== 'production';

export const config = {
  // Application
  app: {
    version: process.env.APP_VERSION || '1.0.0',
    name: process.env.APP_NAME || 'Topnotch Ecom Store',
    env: process.env.NODE_ENV || 'development',
    isDev: dev,
    isProd: !dev,
  },

  // CORS
  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',').map((o) => o.trim()) || [],
    allowedMethods: process.env.CORS_ALLOWED_METHODS || 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS || 'Content-Type, Authorization, X-Requested-With',
    maxAge: parseInt(process.env.CORS_MAX_AGE || '86400', 10),
  },

  // Logging
  logging: {
    level: (process.env.LOG_LEVEL?.toUpperCase() || (dev ? 'DEBUG' : 'INFO')) as 'DEBUG' | 'INFO' | 'WARN' | 'ERROR',
  },

  // Security
  security: {
    csp: process.env.CSP_HEADER,
    referrerPolicy: process.env.REFERRER_POLICY || 'strict-origin-when-cross-origin',
    permissionsPolicy: process.env.PERMISSIONS_POLICY,
    hstsMaxAge: parseInt(process.env.HSTS_MAX_AGE || '31536000', 10),
    hstsIncludeSubDomains: process.env.HSTS_INCLUDE_SUBDOMAINS !== 'false',
    hstsPreload: process.env.HSTS_PRELOAD === 'true',
  },
} as const;

/**
 * Validate required environment variables
 * Note: In Vercel/serverless, some validations may not be needed
 */
export function validateConfig(): void {
  // Only validate in production if needed
  if (config.app.isProd && config.cors.allowedOrigins.length === 0) {
    // Warn but don't throw - Vercel handles CORS differently
    console.warn('ALLOWED_ORIGINS not set - CORS may be restricted in production');
  }
}
