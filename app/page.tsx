import { getSiteBody } from '@/lib/site-content';
import SiteHooks from './site-hooks';

export default function Page() {
  const siteBody = getSiteBody();

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: siteBody }} />
      <SiteHooks />
    </>
  );
}
