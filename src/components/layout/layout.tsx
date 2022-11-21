import React from 'react';

// components
import { Footer } from './footer';
import { Nav } from './nav';
import { SkipToContent } from './skip-to-main';

type Props = {
  blogPost?: boolean;
};

/**
 * Main layout component for all pages on the site.
 */
export const Layout: React.FC<Props> = ({ blogPost, children }) => (
  <div
    className={`overflow-x-hidden max-w-[100vw] text-slate-600 dark:text-slate-200 min-h-screen ${
      blogPost ? 'bg-white dark:bg-slate-900' : 'bg-white dark:bg-slate-800'
    }`}
  >
    <SkipToContent />
    <Nav />
    <div id="main">
      <main>{children}</main>
      <Footer blogPost={!!blogPost} />
    </div>
  </div>
);
