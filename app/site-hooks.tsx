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

    return () => {
      window.closeDrawer = undefined;
      window.removeEventListener('scroll', onScroll);
      hamburger?.removeEventListener('click', openDrawer);
      drawerClose?.removeEventListener('click', closeDrawer);
      observer.disconnect();
    };
  }, []);

  return null;
}
