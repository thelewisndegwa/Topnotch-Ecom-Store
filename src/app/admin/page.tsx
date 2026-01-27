/**
 * Admin Dashboard
 * 
 * Frontend-only dashboard with mock statistics and activity.
 * No API calls, authentication, or backend dependencies.
 * All data is static mock data.
 */

// Mock data
const mockStats = {
  totalBooks: 12,
  totalOrders: 47,
  revenue: 425000,
};

const mockRecentActivity = [
  {
    id: 1,
    type: 'order',
    description: 'New order #ORD-2024-001 from John Doe',
    amount: 'KES 2,500',
    time: '2 minutes ago',
    status: 'pending',
  },
  {
    id: 2,
    type: 'order',
    description: 'Order #ORD-2024-000 completed',
    amount: 'KES 1,800',
    time: '15 minutes ago',
    status: 'completed',
  },
  {
    id: 3,
    type: 'book',
    description: 'New book "Mathematics Form 4" added',
    amount: null,
    time: '1 hour ago',
    status: 'success',
  },
  {
    id: 4,
    type: 'order',
    description: 'New order #ORD-2024-002 from Jane Smith',
    amount: 'KES 3,200',
    time: '2 hours ago',
    status: 'pending',
  },
  {
    id: 5,
    type: 'payment',
    description: 'Payment received for order #ORD-2024-001',
    amount: 'KES 2,500',
    time: '3 hours ago',
    status: 'completed',
  },
  {
    id: 6,
    type: 'blog',
    description: 'Blog post "Study Tips" published',
    amount: null,
    time: '5 hours ago',
    status: 'success',
  },
];

const stats = [
  {
    name: 'Total Books',
    value: mockStats.totalBooks.toString(),
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: 'bg-blue-500',
  },
  {
    name: 'Total Orders',
    value: mockStats.totalOrders.toString(),
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'bg-green-500',
  },
  {
    name: 'Revenue',
    value: `KES ${mockStats.revenue.toLocaleString()}`,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: 'bg-orange-500',
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Overview of your store's performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          return (
            <div
              key={stat.name}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {mockRecentActivity.map((activity) => {
            const getStatusColor = (status: string) => {
              switch (status) {
                case 'completed':
                  return 'bg-green-100 text-green-800';
                case 'pending':
                  return 'bg-yellow-100 text-yellow-800';
                case 'success':
                  return 'bg-blue-100 text-blue-800';
                default:
                  return 'bg-gray-100 text-gray-800';
              }
            };

            const getTypeIcon = (type: string) => {
              switch (type) {
                case 'order':
                  return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  );
                case 'book':
                  return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  );
                case 'payment':
                  return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  );
                case 'blog':
                  return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  );
                default:
                  return null;
              }
            };

            return (
              <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-0.5 text-gray-400">
                      {getTypeIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.description}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    {activity.amount && (
                      <span className="text-sm font-semibold text-gray-900">
                        {activity.amount}
                      </span>
                    )}
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        activity.status
                      )}`}
                    >
                      {activity.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
