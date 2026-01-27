/**
 * Admin Mock Data - Orders
 * 
 * Mock data for admin orders management page.
 * Includes order details, customer information, and status tracking.
 */

export type OrderStatus = 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED' | 'REFUNDED';

export type AdminOrder = {
  id: string;
  status: OrderStatus;
  amount: number;
  date: string; // ISO date string
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: Array<{
    slug: string;
    title: string;
    quantity: number;
    price: number;
  }>;
  paymentMethod?: string;
  shippingAddress?: string;
};

export const adminOrders: AdminOrder[] = [
  {
    id: 'ORD-2024-001',
    status: 'PAID',
    amount: 2500,
    date: '2024-01-15T10:30:00',
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+254712345678',
    },
    items: [
      {
        slug: 'kcse-mathematics-form-4-octopus-revision',
        title: 'KCSE Mathematics Revision · Form 4 (Octopus Method)',
        quantity: 2,
        price: 850,
      },
      {
        slug: 'kcse-english-form-2-comprehension-practice',
        title: 'KCSE English Comprehension · Form 2 Practice',
        quantity: 1,
        price: 780,
      },
    ],
    paymentMethod: 'M-Pesa',
    shippingAddress: '123 Main Street, Nairobi, Kenya',
  },
  {
    id: 'ORD-2024-002',
    status: 'PENDING',
    amount: 1800,
    date: '2024-01-16T14:20:00',
    customer: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+254723456789',
    },
    items: [
      {
        slug: 'kcse-chemistry-form-3-visual-notes',
        title: 'KCSE Chemistry Past Papers · Form 3 Visual Notes',
        quantity: 1,
        price: 920,
      },
      {
        slug: 'kcse-history-form-2-topic-notes',
        title: 'KCSE History & Government · Form 2 Topic Notes',
        quantity: 1,
        price: 760,
      },
    ],
    paymentMethod: 'M-Pesa',
    shippingAddress: '456 Park Avenue, Mombasa, Kenya',
  },
  {
    id: 'ORD-2024-003',
    status: 'PAID',
    amount: 3200,
    date: '2024-01-16T16:45:00',
    customer: {
      name: 'Michael Johnson',
      email: 'michael.j@example.com',
      phone: '+254734567890',
    },
    items: [
      {
        slug: 'kcse-biology-form-4-diagram-atlas',
        title: 'KCSE Biology Diagrams · Form 4 Revision Atlas',
        quantity: 2,
        price: 990,
      },
      {
        slug: 'kcse-physics-form-3-exam-practice',
        title: 'KCSE Physics Exam Practice · Form 3',
        quantity: 1,
        price: 930,
      },
    ],
    paymentMethod: 'Bank Transfer',
    shippingAddress: '789 Oak Road, Kisumu, Kenya',
  },
  {
    id: 'ORD-2024-004',
    status: 'FAILED',
    amount: 990,
    date: '2024-01-17T09:15:00',
    customer: {
      name: 'Sarah Williams',
      email: 'sarah.w@example.com',
      phone: '+254745678901',
    },
    items: [
      {
        slug: 'kcse-biology-form-4-diagram-atlas',
        title: 'KCSE Biology Diagrams · Form 4 Revision Atlas',
        quantity: 1,
        price: 990,
      },
    ],
    paymentMethod: 'M-Pesa',
    shippingAddress: '321 Elm Street, Nakuru, Kenya',
  },
  {
    id: 'ORD-2024-005',
    status: 'PENDING',
    amount: 2100,
    date: '2024-01-17T11:30:00',
    customer: {
      name: 'David Brown',
      email: 'david.brown@example.com',
      phone: '+254756789012',
    },
    items: [
      {
        slug: 'kcse-business-studies-form-4-revision-guide',
        title: 'KCSE Business Studies · Form 4 Revision Guide',
        quantity: 2,
        price: 800,
      },
      {
        slug: 'kcse-cre-form-4-chapter-review',
        title: 'KCSE C.R.E. · Form 4 Chapter Review',
        quantity: 1,
        price: 720,
      },
    ],
    paymentMethod: 'M-Pesa',
    shippingAddress: '654 Pine Avenue, Eldoret, Kenya',
  },
  {
    id: 'ORD-2024-006',
    status: 'PAID',
    amount: 1560,
    date: '2024-01-18T08:00:00',
    customer: {
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '+254767890123',
    },
    items: [
      {
        slug: 'kcse-history-form-2-topic-notes',
        title: 'KCSE History & Government · Form 2 Topic Notes',
        quantity: 2,
        price: 760,
      },
    ],
    paymentMethod: 'M-Pesa',
    shippingAddress: '987 Maple Drive, Thika, Kenya',
  },
  {
    id: 'ORD-2024-007',
    status: 'PAID',
    amount: 2760,
    date: '2024-01-18T13:20:00',
    customer: {
      name: 'Robert Wilson',
      email: 'robert.w@example.com',
      phone: '+254778901234',
    },
    items: [
      {
        slug: 'kcse-mathematics-form-4-octopus-revision',
        title: 'KCSE Mathematics Revision · Form 4 (Octopus Method)',
        quantity: 1,
        price: 850,
      },
      {
        slug: 'kcse-chemistry-form-3-visual-notes',
        title: 'KCSE Chemistry Past Papers · Form 3 Visual Notes',
        quantity: 1,
        price: 920,
      },
      {
        slug: 'kcse-physics-form-3-exam-practice',
        title: 'KCSE Physics Exam Practice · Form 3',
        quantity: 1,
        price: 930,
      },
    ],
    paymentMethod: 'Bank Transfer',
    shippingAddress: '147 Cedar Lane, Nyeri, Kenya',
  },
  {
    id: 'ORD-2024-008',
    status: 'PENDING',
    amount: 1440,
    date: '2024-01-19T10:10:00',
    customer: {
      name: 'Lisa Anderson',
      email: 'lisa.a@example.com',
      phone: '+254789012345',
    },
    items: [
      {
        slug: 'kcse-english-form-2-comprehension-practice',
        title: 'KCSE English Comprehension · Form 2 Practice',
        quantity: 1,
        price: 780,
      },
      {
        slug: 'kcse-cre-form-4-chapter-review',
        title: 'KCSE C.R.E. · Form 4 Chapter Review',
        quantity: 1,
        price: 720,
      },
    ],
    paymentMethod: 'M-Pesa',
    shippingAddress: '258 Birch Street, Machakos, Kenya',
  },
];
