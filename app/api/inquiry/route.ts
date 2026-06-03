import { NextResponse } from 'next/server';

const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;

type RecaptchaResponse = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
};

export async function POST(request: Request) {
  if (!recaptchaSecret) {
    return NextResponse.json(
      { success: false, error: 'RECAPTCHA_SECRET_KEY is not configured.' },
      { status: 500 },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { token?: string; action?: string }
    | null;

  const token = body?.token?.trim();
  const expectedAction = body?.action?.trim() || 'send_inquiry';

  if (!token) {
    return NextResponse.json({ success: false, error: 'Missing reCAPTCHA token.' }, { status: 400 });
  }

  const verification = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: recaptchaSecret,
      response: token,
    }),
  });

  if (!verification.ok) {
    return NextResponse.json(
      { success: false, error: 'Unable to verify reCAPTCHA with Google.' },
      { status: 502 },
    );
  }

  const data = (await verification.json()) as RecaptchaResponse;

  if (!data.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'reCAPTCHA verification failed.',
        errorCodes: data['error-codes'] ?? [],
      },
      { status: 400 },
    );
  }

  if (data.action !== expectedAction) {
    return NextResponse.json(
      { success: false, error: 'Unexpected reCAPTCHA action.' },
      { status: 400 },
    );
  }

  if ((data.score ?? 0) < 0.5) {
    return NextResponse.json(
      { success: false, error: 'Submission flagged as high risk. Please try again.' },
      { status: 400 },
    );
  }

  return NextResponse.json({ success: true });
}
