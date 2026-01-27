# Frontend Connection Guide

This guide explains how to connect your frontend to the Topnotch Books API.

## 1. API Base URL

Set your frontend to use:
```
http://localhost:3000/api/v1
```

For production, update the `NEXT_PUBLIC_API_URL` environment variable.

## 2. Using the API Client

We've created a centralized API client utility that handles all API requests with proper credentials.

### Import the API Client

```typescript
import { api, booksApi, ordersApi, paymentsApi } from '@/lib/api-client';
```

### Example: Fetch Books

```typescript
// Using the books API helper
const { data, error } = await booksApi.getAll();

// Or using the base API client
const { data } = await api.get('/books');
```

### Example: Create Order

```typescript
import { ordersApi } from '@/lib/api-client';

const createOrder = async () => {
  const orderData = {
    items: [
      { slug: 'book-slug', title: 'Book Title', price: 850, quantity: 1 }
    ],
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+254700000000',
      address: '123 Main St',
      city: 'Nairobi',
      postalCode: '00100'
    },
    total: 850,
    paymentMethod: 'mpesa'
  };

  const { data } = await ordersApi.create(orderData);
  return data;
};
```

### Example: M-Pesa Payment

```typescript
import { paymentsApi } from '@/lib/api-client';

const initiateMpesaPayment = async (orderId: string, phoneNumber: string, amount: number) => {
  const { data } = await paymentsApi.mpesa({
    phoneNumber,
    amount,
    orderId
  });
  
  console.log('Payment initiated:', data.message);
  return data;
};

// Usage
await initiateMpesaPayment(
  'ORD-123456',
  '+254700000000',
  1000
);
```

## 3. Using Fetch Directly

If you prefer to use `fetch` directly:

```typescript
const API_BASE_URL = 'http://localhost:3000/api/v1';

// Example: Fetch books
const fetchBooks = async () => {
  const response = await fetch(`${API_BASE_URL}/books`, {
    credentials: 'include', // Important for cookies
  });
  return response.json();
};

```

## 4. Using Axios (Optional)

If you prefer axios, install it first:
```bash
npm install axios
```

Then create an axios instance:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Use it
const books = await api.get('/books');
const order = await api.post('/orders', orderData);
```

## 5. Available Endpoints

### Books
- `GET /api/v1/books` - Get all books
- `GET /api/v1/books/[id]` - Get book by ID

### Blog
- `GET /api/v1/blog` - Get all blog posts
- `GET /api/v1/blog/[slug]` - Get blog post by slug

### Videos
- `GET /api/v1/videos` - Get all videos
- `GET /api/v1/youtube` - Fetch videos from YouTube channel

### Orders
- `GET /api/v1/orders` - Get all orders
- `POST /api/v1/orders` - Create new order

### Payments
- `POST /api/v1/payments/mpesa` - Initiate M-Pesa payment
- `GET /api/v1/payments/mpesa?paymentId=xxx` - Get M-Pesa payment status
- `GET /api/v1/payments/[id]` - Get payment by ID

### Health & Info
- `GET /api/v1/health` - Health check
- `GET /api/v1/routes` - List all available routes

## 6. CORS Configuration

CORS is already configured in the backend. The backend accepts requests from:
- `http://localhost:3000` (development)
- `http://localhost:3001` (development)
- Origins specified in `ALLOWED_ORIGINS` environment variable (production)

Make sure your frontend origin is included in the allowed origins for production.

## 8. Error Handling

The API client throws errors for failed requests. Always use try-catch:

```typescript
try {
  const { data } = await booksApi.getAll();
  // Handle success
} catch (error) {
  // Handle error
  console.error('API Error:', error.message);
}
```

## 8. Environment Variables

Create a `.env.local` file in your frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

For production:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1
```

## 9. Example: Complete Checkout Flow

```typescript
import { ordersApi, paymentsApi } from '@/lib/api-client';

async function completeCheckout(cartItems: any[], customerInfo: any) {
  try {
    // 1. Create order
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const { data: order } = await ordersApi.create({
      items: cartItems,
      customer: customerInfo,
      total,
      paymentMethod: 'mpesa'
    });

    // 2. Initiate payment
    if (customerInfo.paymentMethod === 'mpesa') {
      const { data: payment } = await paymentsApi.mpesa({
        phoneNumber: customerInfo.phone,
        amount: total,
        orderId: order.id
      });
      
      console.log('Payment initiated:', payment.message);
    }

    return { order, payment };
  } catch (error) {
    console.error('Checkout failed:', error);
    throw error;
  }
}
```

## 10. TypeScript Types

The API client is fully typed. Import types if needed:

```typescript
import type { ApiResponse } from '@/lib/api-client';

const response: ApiResponse<Book[]> = await booksApi.getAll();
```

## 11. Testing the Connection

Test your connection:

```typescript
import { healthApi } from '@/lib/api-client';

// Check if API is reachable
const { data } = await healthApi.check();
console.log('API Status:', data);
```

## Troubleshooting

### CORS Errors
- Ensure `credentials: 'include'` is set in fetch requests
- Check that your origin is in `ALLOWED_ORIGINS`
- Verify CORS headers in browser DevTools

### Network Errors
- Check API base URL is correct
- Verify backend server is running
- Check network tab in browser DevTools

## Next Steps

1. **Set up environment variables** for your API URL
2. **Use the API client** in your components
3. **Handle errors** gracefully
4. **Test all endpoints** before production

For more details, see the API client source code at `src/lib/api-client.ts`.
