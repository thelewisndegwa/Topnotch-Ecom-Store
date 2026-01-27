/**
 * Server Startup and Lifecycle Management
 * 
 * Handles server initialization, startup, and graceful shutdown
 */

import { createApp, registerNextApp, getServerConfig } from './app';
import { logger } from './lib/logger';
import { validateConfig } from './lib/config';
import type { Express } from 'express';
import type { NextServer } from 'next';

let server: ReturnType<Express['listen']> | null = null;
let nextApp: NextServer | null = null;
let isShuttingDown = false;

/**
 * Start the server
 */
export async function startServer(): Promise<void> {
  try {
    // Validate configuration
    validateConfig();

    const { dev, hostname, port } = getServerConfig();
    
    logger.info('Starting server', {
      mode: dev ? 'development' : 'production',
      environment: process.env.NODE_ENV || 'development',
      hostname,
      port,
    });

    // Create Express app with middleware
    const app = createApp();
    logger.info('Middleware configured');

    // Register Next.js app and routes
    const { nextApp: nextAppInstance, app: configuredApp } = await registerNextApp(app);
    nextApp = nextAppInstance;
    logger.info('Routes registered');

    // Start HTTP server
    server = configuredApp.listen(port, hostname, () => {
      logger.info('Server ready', {
        url: `http://${hostname}:${port}`,
        apiUrl: `http://${hostname}:${port}/api`,
        mode: dev ? 'development' : 'production',
      });
    });

    // Handle server errors
    server.on('error', (error: Error) => {
      logger.error('Server error', error);
      process.exit(1);
    });

    // Setup graceful shutdown handlers
    setupGracefulShutdown();

  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
}

/**
 * Setup graceful shutdown handlers
 */
function setupGracefulShutdown(): void {
  const shutdown = async (signal: string) => {
    if (isShuttingDown) {
      return;
    }

    isShuttingDown = true;
    logger.info('Received shutdown signal', { signal });

    // Stop accepting new connections
    if (server) {
      server.close(() => {
        logger.info('HTTP server closed');
      });
    }

    // Close Next.js app
    if (nextApp) {
      try {
        await nextApp.close();
        logger.info('Next.js app closed');
      } catch (error) {
        logger.error('Error closing Next.js app', error);
      }
    }

    // Give ongoing requests time to complete
    const shutdownTimeout = setTimeout(() => {
      logger.warn('Forcing shutdown after timeout');
      process.exit(1);
    }, 10000); // 10 second timeout

    // Wait for ongoing requests to complete
    // In a real application, you might want to track active requests
    setTimeout(() => {
      clearTimeout(shutdownTimeout);
      logger.info('Graceful shutdown complete');
      process.exit(0);
    }, 2000); // Wait 2 seconds for requests to complete
  };

  // Handle termination signals
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  // Handle uncaught exceptions
  process.on('uncaughtException', (error: Error) => {
    logger.error('Uncaught Exception', error);
    shutdown('uncaughtException');
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason: unknown) => {
    logger.error('Unhandled Rejection', reason);
    shutdown('unhandledRejection');
  });
}

/**
 * Get server instance (for testing or external access)
 */
export function getServer() {
  return server;
}

// Start server if this file is run directly
// Check if this is the main module (not imported)
const isMainModule = 
  typeof require !== 'undefined' && require.main === module ||
  process.argv[1]?.includes('server.ts');

if (isMainModule) {
  // Set production mode if not already set and not in dev
  if (!process.env.NODE_ENV && !process.argv.includes('--dev')) {
    process.env.NODE_ENV = 'production';
  }

  startServer().catch((error) => {
    logger.error('Fatal error starting server', error);
    process.exit(1);
  });
}
