import React, { useState, useEffect } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import clsx from 'clsx';

// components
import { NavBar, ThemeSwitch, NavDrawer } from '@/components';
import { ClientOnly } from '@/hooks/useHasMounted';

// hooks
import { useScroll } from '@/hooks/useScroll';

/**
 * The main header content.
 */
const HeaderContent: React.FC = () => {
  // get scroll information from custom hook
  const { scrollDir, scrolled } = useScroll();

  // state for opening and closing the nav drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen((open) => !open);
  const closeDrawer = () => setDrawerOpen(false);

  // handling nav drawer open/close
  useEffect(() => {
    // blur the body in the background and prevent scrolling
    const body = document.querySelector('body');
    if (body !== null) {
      if (drawerOpen) {
        body.classList.add('overflow-y-hidden', 'max-h-screen');
      } else {
        body.classList.remove('overflow-y-hidden', 'max-h-screen');
      }
    }
    // close drawer by pressing escape key
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', keyHandler);

    return () => document.removeEventListener('keydown', keyHandler);
  }, [drawerOpen]);

  return (
    <>
      <div
        className={clsx(
          'py-4 px-6 md:px-12 fixed top-0 left-0 right-0 w-full z-40 transition-all text-slate-900 dark:text-slate-50 motion-reduce:!translate-y-0',
          !scrolled && !drawerOpen
            ? 'bg-transparent'
            : 'bg-white dark:bg-slate-900',
          (scrolled || drawerOpen) &&
            'shadow-lg border-b-[1px] border-b-slate-800/20 dark:border-b-slate-50/20',
          scrollDir === 'down' && scrolled && !drawerOpen
            ? '-translate-y-full shadow-none border-b-0'
            : 'translate-y-0'
        )}
      >
        <header className="max-w-site-full mx-auto flex justify-between items-center">
          <div>
            <StaticImage
              src="../../images/site-logo.svg"
              alt="Jon Rutter"
              className="max-w-[2rem] md:max-w-[3rem] h-auto block"
            />
          </div>
          <div className="flex items-center space-x-8">
            <ThemeSwitch />
            <NavBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
          </div>
        </header>
      </div>
      <NavDrawer closeDrawer={closeDrawer} open={drawerOpen} />
    </>
  );
};

/**
 * Renders the site header.
 */
export const Header: React.FC = () => (
  <>
    <ClientOnly>
      <HeaderContent />
    </ClientOnly>

    {/* Spacing to prevent content at top of page disappearing behind header. I'm putting this outside of ClientOnly to prevent content jumps when the Header is rendered */}
    <div className="pt-20 transition-all bg-white dark:bg-slate-900" />
  </>
);
