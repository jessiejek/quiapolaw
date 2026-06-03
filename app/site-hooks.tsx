'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    closeDrawer?: () => void;
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';

function getFieldValue<T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
  form: HTMLFormElement,
  name: string,
) {
  return (form.elements.namedItem(name) as T | null)?.value.trim() ?? '';
}

export default function SiteHooks() {
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const drawer = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const drawerClose = document.getElementById('drawerClose');
    const revealEls = document.querySelectorAll('.reveal');
    const inquiryForm = document.getElementById('inquiryForm') as HTMLFormElement | null;
    const inquiryStatus = document.getElementById('inquiryStatus');
    const submitButton = inquiryForm?.querySelector<HTMLButtonElement>('.form-submit') ?? null;

    let isSubmitting = false;

    const closeDrawer = () => {
      drawer?.classList.remove('open');
      overlay?.classList.remove('open');
      document.body.style.overflow = '';
    };

    window.closeDrawer = closeDrawer;

    const onScroll = () => {
      navbar?.classList.toggle('scrolled', window.scrollY > 20);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 },
    );

    revealEls.forEach((el) => observer.observe(el));
    onScroll();
    window.addEventListener('scroll', onScroll);

    const openDrawer = () => {
      drawer?.classList.add('open');
      overlay?.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    hamburger?.addEventListener('click', openDrawer);
    drawerClose?.addEventListener('click', closeDrawer);

    const getCaptchaToken = async () => {
      if (!recaptchaSiteKey) {
        throw new Error('reCAPTCHA is not configured. Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY.');
      }

      if (!window.grecaptcha) {
        throw new Error('reCAPTCHA has not loaded yet. Please try again in a moment.');
      }

      await new Promise<void>((resolve) => {
        window.grecaptcha?.ready(resolve);
      });

      return window.grecaptcha.execute(recaptchaSiteKey, { action: 'send_inquiry' });
    };

    const verifyCaptchaToken = async (token: string) => {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          action: 'send_inquiry',
        }),
      });

      const result = (await response.json()) as { success?: boolean; error?: string; errorCodes?: string[] };

      if (!response.ok || !result.success) {
        const browserError = result.errorCodes?.includes('browser-error');
        const error = new Error(result.error || 'CAPTCHA verification failed. Please try again.');
        if (browserError) {
          error.name = 'BrowserError';
        }
        throw error;
      }
    };

    const onSubmit = async (event: Event) => {
      event.preventDefault();
      if (!inquiryForm || isSubmitting) return;

      const firstName = getFieldValue<HTMLInputElement>(inquiryForm, 'first_name');
      const lastName = getFieldValue<HTMLInputElement>(inquiryForm, 'last_name');
      const email = getFieldValue<HTMLInputElement>(inquiryForm, 'email');
      const phone = getFieldValue<HTMLInputElement>(inquiryForm, 'phone');
      const legalMatter = getFieldValue<HTMLSelectElement>(inquiryForm, 'legal_matter');
      const message = getFieldValue<HTMLTextAreaElement>(inquiryForm, 'message');

      if (submitButton) {
        submitButton.disabled = true;
      }

      isSubmitting = true;
      if (inquiryStatus) {
        inquiryStatus.textContent = 'Verifying your submission...';
      }

      try {
        let browserErrorRetry = false;

        for (let attempt = 0; attempt < 2; attempt += 1) {
          try {
            const token = await getCaptchaToken();
            await verifyCaptchaToken(token);
            browserErrorRetry = false;
            break;
          } catch (error) {
            if (
              error instanceof Error &&
              error.name === 'BrowserError' &&
              !browserErrorRetry &&
              attempt === 0
            ) {
              browserErrorRetry = true;
              if (inquiryStatus) {
                inquiryStatus.textContent =
                  'reCAPTCHA had a network issue. Retrying once...';
              }
              continue;
            }

            throw error;
          }
        }

        const subject = encodeURIComponent(`Website Inquiry from ${firstName} ${lastName}`.trim());
        const body = encodeURIComponent(
          `Name: ${firstName} ${lastName}\n` +
            `Email: ${email}\n` +
            `Phone / Viber: ${phone}\n` +
            `Legal Matter: ${legalMatter}\n\n` +
            `${message}`,
        );

        if (inquiryStatus) {
          inquiryStatus.textContent = 'Verification complete. Opening your email app...';
        }

        window.location.href = `mailto:consult@quiapolaw.com?subject=${subject}&body=${body}`;
      } catch (error) {
        if (inquiryStatus) {
          inquiryStatus.textContent =
            error instanceof Error ? error.message : 'Something went wrong. Please try again.';
        }
      } finally {
        isSubmitting = false;
        if (submitButton) {
          submitButton.disabled = false;
        }
      }
    };

    inquiryForm?.addEventListener('submit', onSubmit);

    return () => {
      window.closeDrawer = undefined;
      window.removeEventListener('scroll', onScroll);
      hamburger?.removeEventListener('click', openDrawer);
      drawerClose?.removeEventListener('click', closeDrawer);
      inquiryForm?.removeEventListener('submit', onSubmit as EventListener);
      observer.disconnect();
    };
  }, []);

  return null;
}
