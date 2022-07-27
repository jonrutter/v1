import React from 'react';

// components
import { Footer } from './footer';
import { Nav } from './nav';
import { SkipToContent } from './skip-to-main';

type Props = {
  withCTA?: boolean;
};

/**
 * Main layout component for all pages on the site.
 *
 * @param props.withCTA - (Optional) renders a Call to action box at the bottom of the page.
 */
export const Layout: React.FC<Props> = ({ withCTA, children }) => (
  <div className="overflow-x-hidden max-w-[100vw] bg-white dark:bg-slate-900 transition-all text-slate-700 dark:text-slate-200">
    <SkipToContent />
    <Nav />
    <div id="main">
      <main>{children}</main>
      <Footer short={!withCTA} />
    </div>
  </div>
);

export * from './footer';
export * from './nav';
export * from './hero';
export * from './section';
export * from './skip-to-main';
