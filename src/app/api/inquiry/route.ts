import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      source = 'booking',
      fullName,
      email,
      phone,
      preferredDate,
      guests,
      destinationSlug,
      packageId,
      specialRequests,
      message,
    } = body;

    // Booking inquiries need a travel date; contact messages need a message body
    const missingRequired =
      !fullName || !email || !phone || (source === 'contact' ? !message : !preferredDate);

    if (missingRequired) {
      return NextResponse.json(
        { success: false, error: 'Missing required inquiry parameters' },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('GOOGLE_SHEETS_WEBHOOK_URL is not set; inquiry was not saved.');
      return NextResponse.json(
        { success: false, error: 'Inquiry service is not configured' },
        { status: 500 }
      );
    }

    const row = {
      createdAt: new Date().toISOString(),
      source,
      fullName,
      email,
      phone,
      preferredDate: preferredDate ?? '',
      guests: guests ?? '',
      destinationSlug: destinationSlug ?? '',
      packageId: packageId ?? '',
      specialRequests: specialRequests ?? '',
      message: message ?? '',
    };

    // Apps Script web apps answer POSTs with a redirect; fetch follows it to read the result.
    // text/plain avoids a CORS preflight and Apps Script reads it from e.postData.contents.
    const sheetRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(row),
    });

    const sheetText = await sheetRes.text();
    let sheetResult: { success?: boolean; error?: string } = {};
    try {
      sheetResult = JSON.parse(sheetText);
    } catch {
      // Non-JSON means Apps Script returned an error/login page (wrong URL or access setting)
    }

    if (!sheetRes.ok || !sheetResult.success) {
      console.error('Google Sheets webhook failed:', sheetRes.status, sheetText.slice(0, 500));
      return NextResponse.json(
        { success: false, error: 'Failed to save inquiry' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Inquiry successfully recorded for ${fullName}. A travel concierge will contact you shortly.`,
    });
  } catch (error) {
    console.error('Inquiry route error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
