/**
 * API Client Utility
 * 
 * Centralized API client for making requests to the Next.js API routes
 * Works in both development and production (Vercel)
 */

// In production/Vercel, API routes are on the same domain
// In development, can use relative paths or full URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Base fetch function with error handling
 */
async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  // Use relative paths for same-origin requests (works in Vercel)
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      throw new Error(`Unexpected content type: ${contentType}`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `API request failed: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    // Network errors or JSON parsing errors
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown API error occurred');
  }
}

/**
 * API Client with common HTTP methods
 */
export const api = {
  /**
   * GET request
   */
  get: <T = any>(endpoint: string): Promise<ApiResponse<T>> => {
    return apiFetch<T>(endpoint, { method: 'GET' });
  },

  /**
   * POST request
   */
  post: <T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> => {
    return apiFetch<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  /**
   * PUT request
   */
  put: <T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> => {
    return apiFetch<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  /**
   * PATCH request
   */
  patch: <T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> => {
    return apiFetch<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  /**
   * DELETE request
   */
  delete: <T = any>(endpoint: string): Promise<ApiResponse<T>> => {
    return apiFetch<T>(endpoint, { method: 'DELETE' });
  },
};

/**
 * Books API
 */
export const booksApi = {
  getAll: () => api.get('/books'),
  getById: (id: string) => api.get(`/books/${id}`),
};

/**
 * Blog API
 */
export const blogApi = {
  getAll: () => api.get('/blog'),
  getBySlug: (slug: string) => api.get(`/blog/${slug}`),
};

/**
 * Videos API
 */
export const videosApi = {
  getAll: () => api.get('/videos'),
  getYouTube: () => api.get('/youtube'),
};

/**
 * Orders API
 */
export const ordersApi = {
  create: (orderData: any) => api.post('/orders', orderData),
  getAll: () => api.get('/orders'),
};

/**
 * Payments API
 */
export const paymentsApi = {
  /**
   * M-Pesa payment
   */
  mpesa: (paymentData: {
    phoneNumber: string;
    amount: number;
    orderId: string;
  }) => api.post('/payments/mpesa', paymentData),

  /**
   * Get payment status
   */
  getStatus: (paymentId: string) => api.get(`/payments/${paymentId}`),
};

/**
 * Health check
 */
export const healthApi = {
  check: () => api.get('/health'),
};

/**
 * Example usage:
 * 
 * // Fetch books
 * const { data } = await booksApi.getAll();
 * 
 * // Create order
 * const { data } = await ordersApi.create({ items: [...], customer: {...} });
 * 
 * // M-Pesa payment
 * const { data } = await paymentsApi.mpesa({
 *   phoneNumber: '+254700000000',
 *   amount: 1000,
 *   orderId: 'ORD-123'
 * });
 */
