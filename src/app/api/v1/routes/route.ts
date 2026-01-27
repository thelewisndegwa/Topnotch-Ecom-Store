import { NextRequest, NextResponse } from 'next/server';
import { apiRoutes, getApiPath } from '@/routes';

/**
 * GET /api/v1/routes
 * Returns all available API routes for discovery
 */
export async function GET(request: NextRequest) {
  try {
    const routes = apiRoutes.map((route) => ({
      path: getApiPath(route),
      methods: route.methods,
      version: route.version,
      description: route.description,
      requiresAuth: route.requiresAuth || false,
    }));

    return NextResponse.json(
      {
        success: true,
        data: routes,
        count: routes.length,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch routes',
      },
      { status: 500 }
    );
  }
}
