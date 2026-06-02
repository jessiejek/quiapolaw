import type { ReactNode } from 'react';
import { getSiteStyles } from '@/lib/site-content';

export const metadata = {
  title: 'Quiapo Law — Filipino Legal Excellence',
  description: 'Quiapo Law office and notary public in Minglanilla, Cebu.',
  icons: {
    icon: '/FL2.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const siteStyles = getSiteStyles();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: siteStyles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
