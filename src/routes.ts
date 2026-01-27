/**
 * Central API Routes Configuration
 * 
 * This file registers all API modules with clean versioned routing.
 * All routes are prefixed with /api and organized by version.
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';

export interface RouteDefinition {
  /** The route path (without /api prefix) */
  path: string;
  /** HTTP methods supported by this route */
  methods: HttpMethod[];
  /** Version of the API (e.g., 'v1', 'v2') */
  version: string;
  /** Description of what this route does */
  description?: string;
  /** Whether this route requires authentication */
  requiresAuth?: boolean;
}

/**
 * API Route Registry
 * 
 * All routes are automatically prefixed with /api/{version}
 * Example: { path: 'books', version: 'v1' } -> /api/v1/books
 */
export const apiRoutes: RouteDefinition[] = [
  // Version 1 Routes
  {
    path: 'books',
    version: 'v1',
    methods: ['GET'],
    description: 'Get all books',
  },
  {
    path: 'books/[id]',
    version: 'v1',
    methods: ['GET'],
    description: 'Get a specific book by ID',
  },
  {
    path: 'blog',
    version: 'v1',
    methods: ['GET'],
    description: 'Get all blog posts',
  },
  {
    path: 'blog/[slug]',
    version: 'v1',
    methods: ['GET'],
    description: 'Get a specific blog post by slug',
  },
  {
    path: 'videos',
    version: 'v1',
    methods: ['GET'],
    description: 'Get all videos',
  },
  {
    path: 'health',
    version: 'v1',
    methods: ['GET'],
    description: 'Health check endpoint',
  },
  {
    path: 'routes',
    version: 'v1',
    methods: ['GET'],
    description: 'List all available API routes',
  },
];

/**
 * Get the full API path for a route
 * @param route - The route definition
 * @returns Full path including /api prefix and version
 */
export function getApiPath(route: RouteDefinition): string {
  return `/api/${route.version}/${route.path}`;
}

/**
 * Get all routes for a specific version
 * @param version - API version (e.g., 'v1')
 * @returns Array of route definitions for that version
 */
export function getRoutesByVersion(version: string): RouteDefinition[] {
  return apiRoutes.filter((route) => route.version === version);
}

/**
 * Find a route by path and version
 * @param path - Route path (without /api prefix)
 * @param version - API version
 * @returns Route definition or undefined if not found
 */
export function findRoute(path: string, version: string): RouteDefinition | undefined {
  return apiRoutes.find(
    (route) => route.path === path && route.version === version
  );
}

/**
 * Get all available API versions
 * @returns Array of unique version strings
 */
export function getAvailableVersions(): string[] {
  return Array.from(new Set(apiRoutes.map((route) => route.version))).sort();
}

/**
 * Validate if a route exists and supports the given HTTP method
 * @param path - Route path (without /api prefix)
 * @param version - API version
 * @param method - HTTP method
 * @returns True if route exists and supports the method
 */
export function isRouteValid(
  path: string,
  version: string,
  method: HttpMethod
): boolean {
  const route = findRoute(path, version);
  return route !== undefined && route.methods.includes(method);
}
