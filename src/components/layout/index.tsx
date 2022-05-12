import React from 'react';

// components
import { Footer } from './footer';
import { Header } from './header';
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
  <div className="overflow-x-hidden bg-white dark:bg-slate-900 transition-all text-slate-700 dark:text-slate-200">
    <SkipToContent />
    <Header />
    <div id="main">
      <main>{children}</main>
      <Footer short={!withCTA} />
    </div>
  </div>
);

export * from './footer';
export * from './header';
export * from './hero';
export * from './nav';
export * from './section';
export * from './skip-to-main';
