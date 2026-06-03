# Resend Setup

Use Resend for transactional email delivery from the inquiry form.

1. Create a Resend account.
2. Add and verify your sending domain, or use the onboarding sender while testing.
3. Create an API key with sending access.
4. Put the values into `.env.local`:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_google_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_google_recaptcha_secret_key
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM=Quiapo Law <onboarding@resend.dev>
```

Notes:
- `RESEND_API_KEY` must stay server-side.
- `RESEND_FROM` should be a sender address allowed by your Resend account.
- The inquiry form sends to `consult@quiapolaw.com`.
- The submitter's email is used as the reply-to header.
