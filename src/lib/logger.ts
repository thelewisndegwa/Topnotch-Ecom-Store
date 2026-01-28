/**
 * Structured Logging System
 * 
 * Production-ready logging with different log levels and structured output
 * Works in both serverless (Vercel) and traditional Node.js environments
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

const dev = process.env.NODE_ENV !== 'production';
const logLevel = (process.env.LOG_LEVEL?.toUpperCase() as keyof typeof LogLevel) || (dev ? 'DEBUG' : 'INFO');

class Logger {
  private minLevel: LogLevel;

  constructor() {
    this.minLevel = LogLevel[logLevel] ?? LogLevel.INFO;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.minLevel;
  }

  private formatMessage(level: string, message: string, meta?: Record<string, unknown>): string {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...meta,
    };

    if (dev) {
      // Pretty print in development
      return JSON.stringify(logEntry, null, 2);
    }

    // Compact JSON in production (for log aggregation tools like Vercel)
    return JSON.stringify(logEntry);
  }

  private log(level: LogLevel, levelName: string, message: string, meta?: Record<string, unknown>): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const formatted = this.formatMessage(levelName, message, meta);
    
    switch (level) {
      case LogLevel.ERROR:
        console.error(formatted);
        break;
      case LogLevel.WARN:
        console.warn(formatted);
        break;
      case LogLevel.INFO:
        console.info(formatted);
        break;
      case LogLevel.DEBUG:
        console.debug(formatted);
        break;
    }
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    this.log(LogLevel.DEBUG, 'DEBUG', message, meta);
  }

  info(message: string, meta?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, 'INFO', message, meta);
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, 'WARN', message, meta);
  }

  error(message: string, error?: Error | unknown, meta?: Record<string, unknown>): void {
    const errorMeta = error instanceof Error
      ? {
          ...meta,
          error: {
            name: error.name,
            message: error.message,
            stack: dev ? error.stack : undefined,
          },
        }
      : { ...meta, error };

    this.log(LogLevel.ERROR, 'ERROR', error instanceof Error ? error.message : String(error), errorMeta);
  }
}

// Singleton instance
export const logger = new Logger();

/**
 * Request logging helper for Next.js API routes
 */
export interface RequestLogMeta {
  method: string;
  path: string;
  statusCode: number;
  duration: number;
  ip?: string;
  userAgent?: string;
  requestId?: string;
}

export function logRequest(meta: RequestLogMeta): void {
  const { method, path, statusCode, duration, ip, userAgent, requestId } = meta;

  const logData: Record<string, unknown> = {
    method,
    path,
    statusCode,
    duration: `${duration}ms`,
    ...(ip && { ip }),
    ...(userAgent && { userAgent }),
    ...(requestId && { requestId }),
  };

  if (statusCode >= 500) {
    logger.error('Request failed', undefined, logData);
  } else if (statusCode >= 400) {
    logger.warn('Request error', logData);
  } else {
    logger.info('Request completed', logData);
  }
}
