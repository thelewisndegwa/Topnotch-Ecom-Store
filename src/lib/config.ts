/**
 * Application configuration (frontend-only, no backend).
 */

const dev = process.env.NODE_ENV !== 'production';

export const config = {
  app: {
    version: process.env.APP_VERSION || '1.0.0',
    name: process.env.APP_NAME || 'Topnotch Ecom Store',
    env: process.env.NODE_ENV || 'development',
    isDev: dev,
    isProd: !dev,
  },
  logging: {
    level: (process.env.LOG_LEVEL?.toUpperCase() || (dev ? 'DEBUG' : 'INFO')) as 'DEBUG' | 'INFO' | 'WARN' | 'ERROR',
  },
  security: {
    csp: process.env.CSP_HEADER,
    referrerPolicy: process.env.REFERRER_POLICY || 'strict-origin-when-cross-origin',
    permissionsPolicy: process.env.PERMISSIONS_POLICY,
    hstsMaxAge: parseInt(process.env.HSTS_MAX_AGE || '31536000', 10),
    hstsIncludeSubDomains: process.env.HSTS_INCLUDE_SUBDOMAINS !== 'false',
    hstsPreload: process.env.HSTS_PRELOAD === 'true',
  },
} as const;
