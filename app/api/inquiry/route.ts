import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM || 'Quiapo Law <onboarding@resend.dev>';
const mailTo = 'consult@quiapolaw.com';
const resend = resendApiKey ? new Resend(resendApiKey) : null;

function escapeHtml(value: string) {
  return value.replace(/[&<>"]/g, (char) => {
    if (char === '&') return '&amp;';
    if (char === '<') return '&lt;';
    if (char === '>') return '&gt;';
    return '&quot;';
  });
}

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
    | {
        token?: string;
        action?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        legalMatter?: string;
        message?: string;
      }
    | null;

  const token = body?.token?.trim();
  const expectedAction = body?.action?.trim() || 'send_inquiry';
  const firstName = body?.firstName?.trim() || '';
  const lastName = body?.lastName?.trim() || '';
  const email = body?.email?.trim() || '';
  const phone = body?.phone?.trim() || '';
  const legalMatter = body?.legalMatter?.trim() || '';
  const message = body?.message?.trim() || '';
  const requestHostname = new URL(request.url).hostname;
  const isLocalRequest =
    process.env.NODE_ENV !== 'production' &&
    (requestHostname === 'localhost' || requestHostname === '127.0.0.1' || requestHostname === '::1');

  if (!token) {
    return NextResponse.json({ success: false, error: 'Missing reCAPTCHA token.' }, { status: 400 });
  }

  if (!isLocalRequest) {
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
  }

  if (!resend) {
    return NextResponse.json(
      {
        success: false,
        error: 'Email delivery is not configured. Set RESEND_API_KEY and RESEND_FROM in .env.local.',
      },
      { status: 500 },
    );
  }

  const subject = `Website Inquiry from ${firstName} ${lastName}`.trim();
  const text = [
    `Name: ${firstName} ${lastName}`.trim(),
    `Email: ${email}`,
    `Phone / Viber: ${phone}`,
    `Legal Matter: ${legalMatter}`,
    '',
    message,
  ].join('\n');

  const { error } = await resend.emails.send({
    from: resendFrom,
    to: [mailTo],
    subject,
    text,
    html: text
      .split('\n')
      .map((line) => `<p>${line ? escapeHtml(line) : '&nbsp;'}</p>`)
      .join(''),
    replyTo: email || undefined,
  });

  if (error) {
    console.error('Resend send failed', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Unable to send email.',
        details:
          process.env.NODE_ENV !== 'production'
            ? {
                name: error.name,
                message: error.message,
              }
            : undefined,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
