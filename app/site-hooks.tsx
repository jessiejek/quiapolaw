'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    closeDrawer?: () => void;
  }
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

    const onSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      if (!inquiryForm) return;

      const firstName = (inquiryForm.elements.namedItem('first_name') as HTMLInputElement)?.value.trim() ?? '';
      const lastName = (inquiryForm.elements.namedItem('last_name') as HTMLInputElement)?.value.trim() ?? '';
      const email = (inquiryForm.elements.namedItem('email') as HTMLInputElement)?.value.trim() ?? '';
      const phone = (inquiryForm.elements.namedItem('phone') as HTMLInputElement)?.value.trim() ?? '';
      const legalMatter = (inquiryForm.elements.namedItem('legal_matter') as HTMLSelectElement)?.value.trim() ?? '';
      const message = (inquiryForm.elements.namedItem('message') as HTMLTextAreaElement)?.value.trim() ?? '';

      const subject = encodeURIComponent(`Website Inquiry from ${firstName} ${lastName}`.trim());
      const body = encodeURIComponent(
        `Name: ${firstName} ${lastName}\n` +
          `Email: ${email}\n` +
          `Phone / Viber: ${phone}\n` +
          `Legal Matter: ${legalMatter}\n\n` +
          `${message}`,
      );

      if (inquiryStatus) {
        inquiryStatus.textContent = 'Opening your email app with a prefilled inquiry...';
      }

      window.location.href = `mailto:consult@quiapolaw.com?subject=${subject}&body=${body}`;
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
