/**
 * Configuration Management
 * 
 * Centralized configuration with environment variable validation
 */

const dev = process.env.NODE_ENV !== 'production';

export const config = {
  // Server
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    hostname: process.env.HOSTNAME || 'localhost',
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

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
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

  // Application
  app: {
    version: process.env.APP_VERSION || '1.0.0',
    name: process.env.APP_NAME || 'Topnotch Ecom Store',
  },
} as const;

/**
 * Validate required environment variables
 */
export function validateConfig(): void {
  const required = [];

  if (config.server.isProd) {
    if (config.cors.allowedOrigins.length === 0) {
      required.push('ALLOWED_ORIGINS');
    }
  }

  if (required.length > 0) {
    throw new Error(
      `Missing required environment variables: ${required.join(', ')}`
    );
  }
}
