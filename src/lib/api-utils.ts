/**
 * API Utility Functions
 * 
 * Helper functions for working with the API routes system
 */

import { NextRequest, NextResponse } from 'next/server';
import { isRouteValid, HttpMethod, findRoute } from '@/routes';

/**
 * Validates an incoming API request against the route registry
 * @param request - Next.js request object
 * @param path - Route path (without /api prefix)
 * @param version - API version
 * @returns Error response if invalid, null if valid
 */
export function validateApiRequest(
  request: NextRequest,
  path: string,
  version: string
): NextResponse | null {
  const method = request.method as HttpMethod;

  if (!isRouteValid(path, version, method)) {
    const route = findRoute(path, version);
    
    if (!route) {
      return NextResponse.json(
        {
          success: false,
          error: 'Route not found',
          path: `/api/${version}/${path}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Method not allowed',
        path: `/api/${version}/${path}`,
        allowedMethods: route.methods,
      },
      { status: 405 }
    );
  }

  return null;
}

/**
 * Creates a standardized error response
 */
export function createErrorResponse(
  message: string,
  status: number = 500
): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status }
  );
}

/**
 * Creates a standardized success response
 */
export function createSuccessResponse<T>(
  data: T,
  status: number = 200,
  meta?: Record<string, unknown>
): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
      ...meta,
    },
    { status }
  );
}
