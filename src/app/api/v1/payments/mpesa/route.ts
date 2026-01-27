import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/v1/payments/mpesa
 * Initiate M-Pesa payment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, amount, orderId } = body;

    // Validate input
    if (!phoneNumber || !amount || !orderId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Phone number, amount, and order ID are required',
        },
        { status: 400 }
      );
    }

    // Validate phone number format (Kenyan format)
    const phoneRegex = /^(\+254|0)[17]\d{8}$/;
    const cleanPhone = phoneNumber.replace(/\s+/g, '');
    
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid phone number format. Use +254XXXXXXXXX or 0XXXXXXXXX',
        },
        { status: 400 }
      );
    }

    // Format phone number for M-Pesa (254XXXXXXXXX)
    const formattedPhone = cleanPhone.startsWith('0')
      ? `254${cleanPhone.substring(1)}`
      : cleanPhone.startsWith('+254')
      ? cleanPhone.substring(1)
      : cleanPhone;

    // In a real application, you would:
    // 1. Integrate with M-Pesa API (Daraja API)
    // 2. Generate payment request
    // 3. Store payment record in database
    // 4. Handle callbacks from M-Pesa

    // For demo purposes, generate a payment ID
    const paymentId = `MPESA-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Simulate M-Pesa payment initiation
    // In production, this would make actual API calls to Safaricom Daraja API
    const paymentData = {
      id: paymentId,
      phoneNumber: formattedPhone,
      amount,
      orderId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      message: 'Payment request initiated. Please check your phone for M-Pesa prompt.',
    };

    console.log('M-Pesa payment initiated:', paymentData);

    return NextResponse.json(
      {
        success: true,
        data: paymentData,
        message: 'M-Pesa payment request initiated. Please check your phone.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('M-Pesa payment error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to initiate M-Pesa payment',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/v1/payments/mpesa
 * Get M-Pesa payment status (for polling)
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const paymentId = searchParams.get('paymentId');
  const orderId = searchParams.get('orderId');

  if (!paymentId && !orderId) {
    return NextResponse.json(
      {
        success: false,
        error: 'Payment ID or Order ID is required',
      },
      { status: 400 }
    );
  }

  // In a real application, fetch from database
  return NextResponse.json(
    {
      success: true,
      data: {
        status: 'pending', // pending, completed, failed
        message: 'Payment status check - implement database lookup',
      },
    },
    { status: 200 }
  );
}
