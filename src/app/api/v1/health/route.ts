import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/v1/health
 * Enhanced health check endpoint with system metrics
 */
export async function GET(request: NextRequest) {
  const startTime = process.uptime();
  const memoryUsage = process.memoryUsage();
  
  // Calculate memory usage in MB
  const memory = {
    rss: Math.round((memoryUsage.rss / 1024 / 1024) * 100) / 100,
    heapTotal: Math.round((memoryUsage.heapTotal / 1024 / 1024) * 100) / 100,
    heapUsed: Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100,
    external: Math.round((memoryUsage.external / 1024 / 1024) * 100) / 100,
  };

  // Calculate heap usage percentage
  const heapUsagePercent = Math.round(
    (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100
  );

  // Health status based on memory usage
  const isHealthy = heapUsagePercent < 90; // Consider unhealthy if heap usage > 90%

  const healthData = {
    success: true,
    status: isHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    version: 'v1',
    uptime: {
      seconds: Math.floor(startTime),
      formatted: formatUptime(startTime),
    },
    memory,
    memoryUsage: {
      percent: heapUsagePercent,
      status: heapUsagePercent < 70 ? 'normal' : heapUsagePercent < 90 ? 'high' : 'critical',
    },
    environment: process.env.NODE_ENV || 'development',
    ...(process.env.APP_VERSION && { appVersion: process.env.APP_VERSION }),
  };

  return NextResponse.json(healthData, {
    status: isHealthy ? 200 : 503,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}

/**
 * Format uptime in human-readable format
 */
function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

  return parts.join(' ');
}
