import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, preferredDate, guests, destinationSlug } = body;

    if (!fullName || !email || !phone || !preferredDate) {
      return NextResponse.json(
        { success: false, error: 'Missing required inquiry parameters' },
        { status: 400 }
      );
    }

    console.log('API Route Received Booking Inquiry:', {
      fullName,
      email,
      phone,
      preferredDate,
      guests,
      destinationSlug,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: `Inquiry successfully recorded for ${fullName}. A travel concierge will contact you shortly.`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
