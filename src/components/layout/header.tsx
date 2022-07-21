import React, { useState, useEffect, FC } from 'react';
import clsx from 'clsx';
import FocusLock from 'react-focus-lock';

// components
import { RingButton, Icon, IconButton } from '@/components';
import { StyledLink } from '../styled-link';
import { Logo } from '../logo';
import { ThemeToggle } from '../theme-toggle';

// data
import { menu, socialLinks } from '@/config';

// ~~~ Nav Bar ~~~
type NavBarProps = {
  tabIndex?: number;
};

const NavBar: FC<NavBarProps> = ({ tabIndex = 0 }) => (
  <>
    {menu.map((link) => (
      <li key={link.name}>
        <StyledLink
          to={link.url}
          tabIndex={tabIndex}
          activeClassName="before:scale-x-100 !text-slate-900 dark:!text-slate-50"
          partiallyActive={link.name === 'Blog'}
        >
          {link.name}
        </StyledLink>
      </li>
    ))}
  </>
);

// ~~~ Social Links ~~~

const SocialLinks: FC = () => (
  <>
    {socialLinks.map((link) => (
      <li key={link.name}>
        <IconButton
          as="a"
          href={link.url}
          fontSize={5}
          aria-label={link.name}
          className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 focus:text-slate-900 dark:focus:text-slate-50"
        >
          <Icon name={link.icon} />
        </IconButton>
      </li>
    ))}
  </>
);

// ~~~ Menu Button ~~~

type MenuButtonProps = {
  open: boolean;
  onClick: () => void;
};

const MenuButton: FC<MenuButtonProps> = ({ open, onClick }) => (
  <RingButton
    aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
    title={open ? 'Close navigation menu' : 'Open navigation menu'}
    onClick={onClick}
  >
    {open ? <Icon name="close" /> : <Icon name="menu" />}
  </RingButton>
);

// ~~~ Nav Menu ~~~

type NavDrawerProps = {
  open: boolean;
  closeDrawer: () => void;
};

export const NavDrawer: FC<NavDrawerProps> = ({ open, closeDrawer }) => {
  const tabIndex = open ? 0 : -1;

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 bottom-0 right-0 z-30 transition-all',
        open ? 'visible' : 'invisible'
      )}
      aria-hidden={!open}
      id="nav-drawer"
      data-testid="nav-drawer"
    >
      {/* click outside indicator */}
      <div
        className="fixed top-0 left-0 right-0 bottom-0 -z-10 min-h-screen cursor-pointer backdrop-blur"
        onClick={closeDrawer}
      />
      {/* main dropdown box */}
      <div
        className={clsx(
          'fixed top-0 right-0 w-11/12 max-w-sm overflow-y-auto transition-all font-heading h-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 text-xl shadow-xl border-l-[1px] border-l-slate-800/20 dark:border-l-slate-50/20',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {open && (
          <FocusLock>
            <div className="py-8 px-8 md:px-12 flex justify-end">
              <MenuButton open={open} onClick={closeDrawer} />
            </div>
            <div className="py-8 px-6 text-center">
              <ul className="flex flex-col mb-12 space-y-8">
                <NavBar tabIndex={tabIndex} />
              </ul>
              <ul className="flex justify-center text-2xl space-x-4 mb-12">
                <SocialLinks />
              </ul>
              <div className="flex items-center justify-center">
                <ThemeToggle />
              </div>
            </div>
          </FocusLock>
        )}
      </div>
    </div>
  );
};

/**
 * The main header content.
 */
export const Header: FC = () => {
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
      <header className="py-8 lg:py-12 px-6 md:px-12 w-full z-40 transition-all text-slate-900 dark:text-slate-50 motion-reduce:!translate-y-0 bg-transparent">
        <nav className="max-w-site-full mx-auto flex justify-between items-center">
          <div className="max-w-[3rem] h-auto">
            <Logo />
          </div>
          <ul className="hidden md:flex items-center space-x-8 font-heading font-medium text-lg text-slate-600 dark:text-slate-300">
            <NavBar />
          </ul>
          <ul className="hidden lg:flex space-x-4 items-center">
            <SocialLinks />
          </ul>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <div className="block lg:hidden">
              <MenuButton open={drawerOpen} onClick={toggleDrawer} />
            </div>
          </div>
          <NavDrawer open={drawerOpen} closeDrawer={closeDrawer} />
        </nav>
      </header>
    </>
  );
};
