/**
 * Application Setup
 * 
 * Configures middleware, registers routes, and sets up the Next.js application
 */

import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import next, { type NextServer } from 'next';
import { apiRoutes, getApiPath, type RouteDefinition } from './routes';
import { corsMiddleware } from './lib/cors';
import { securityHeadersMiddleware, createRateLimitMiddleware } from './lib/security';
import { logger, logRequest } from './lib/logger';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

/**
 * Create Express application with middleware
 */
export function createApp(): Express {
  const app = express();

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Security headers (must be first)
  app.use(securityHeadersMiddleware);

  // CORS middleware
  app.use(corsMiddleware);

  // Request ID middleware (for tracing)
  app.use((req: Request, res: Response, next: NextFunction) => {
    const requestId = req.headers['x-request-id'] || 
                     `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    res.setHeader('X-Request-Id', requestId);
    (req as Request & { requestId: string }).requestId = requestId;
    next();
  });

  // Structured request logging middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const requestId = (req as Request & { requestId?: string }).requestId;

    res.on('finish', () => {
      const duration = Date.now() - start;
      logRequest({
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        duration,
        ip: req.ip || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
        requestId,
      });
    });

    next();
  });

  // Rate limiting (applied to all routes except health check)
  const rateLimit = createRateLimitMiddleware(
    parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes default
    parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10) // 100 requests default
  );
  
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Skip rate limiting for health check
    if (req.path === '/api/v1/health') {
      return next();
    }
    rateLimit(req, res, next);
  });

  // API route validation middleware
  app.use('/api', (req: Request, res: Response, next: NextFunction) => {
    // Extract version and path from request
    const pathParts = req.path.split('/').filter(Boolean);
    
    if (pathParts.length >= 2 && pathParts[0].startsWith('v')) {
      const version = pathParts[0];
      const routePath = pathParts.slice(1).join('/');
      
      // Log registered routes for debugging
      const route = apiRoutes.find(
        (r: RouteDefinition) => r.version === version && r.path === routePath
      );
      
      if (route) {
        logger.debug('API route accessed', {
          method: req.method,
          path: getApiPath(route),
          version,
        });
      } else if (dev) {
        logger.warn('Unregistered API route accessed', {
          method: req.method,
          path: req.path,
          version,
        });
      }
    }

    next();
  });

  // Error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const requestId = (req as Request & { requestId?: string }).requestId;
    
    logger.error('Request error', err, {
      method: req.method,
      path: req.path,
      requestId,
    });
    
    res.status(500).json({
      success: false,
      error: dev ? err.message : 'Internal server error',
      ...(dev && { stack: err.stack }),
      ...(requestId && { requestId }),
    });
  });

  return app;
}

/**
 * Register Next.js app with Express
 */
export async function registerNextApp(app: Express) {
  const nextApp = next({ dev, hostname, port });
  const handle = nextApp.getRequestHandler();

  await nextApp.prepare();

  // Handle all other routes with Next.js
  app.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  return { nextApp, app };
}

/**
 * Get server configuration
 */
export function getServerConfig() {
  return {
    dev,
    hostname,
    port,
  };
}
