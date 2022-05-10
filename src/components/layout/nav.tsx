import React from 'react';
import clsx from 'clsx';

// link data
import { menu, socialLinks } from '../../config';

// components
import { Hamburger } from '../hamburger';
import { StyledLink } from '../styled-link';
import { SocialLink } from '../social-link';
import { Icon } from '../icon';

/* ~~~ NavLink ~~~ */

type NavLinkProps = {
  to: string;
  tabIndex?: number;
};

/**
 * A styled nav link, used in the nav bar and nav drawer.
 */
export const NavLink: React.FC<NavLinkProps> = ({
  to,
  tabIndex = 0,
  children,
}) => (
  <StyledLink
    to={to}
    className="text-slate-900 dark:text-slate-50  hover:text-sea-600 dark:hover:text-sea-400  focus:text-sea-600 dark:focus:text-sea-400"
    activeClassName="before:scale-x-100 !text-slate-900 hover:!text-slate-900 focus:text-sky-500 dark:focus:text-sky-400 dark:!text-slate-50"
    tabIndex={tabIndex}
  >
    {children}
  </StyledLink>
);

/* ~~~ NavBar ~~~ */

type NavBarProps = {
  drawerOpen: boolean;
  closeDrawer: () => void;
  toggleDrawer: () => void;
};

export const NavBar: React.FC<NavBarProps> = ({
  drawerOpen,
  closeDrawer,
  toggleDrawer,
}) => (
  <nav>
    <ul className="hidden md:flex items-center space-x-6">
      {menu.map((link, index) => (
        <li key={index} className="font-heading font-medium text-lg">
          <NavLink to={link.url}>{link.name}</NavLink>
        </li>
      ))}
    </ul>
    <div className="block md:hidden">
      <Hamburger
        onClick={toggleDrawer}
        open={drawerOpen}
        aria-label="Toggle navigation menu"
      />
    </div>
    <NavDrawer closeDrawer={closeDrawer} open={drawerOpen} />
  </nav>
);

/* ~~~ NavDrawer ~~~ */

type NavDrawerProps = {
  open: boolean;
  closeDrawer: () => void;
};

// TODO: refactor with nav to avoid having to set h-screen

export const NavDrawer: React.FC<NavDrawerProps> = ({ open, closeDrawer }) => {
  const tabIndex = open ? 0 : -1;

  return (
    <>
      {/* click outside indicator */}
      <div
        className={clsx(
          'fixed top-[4.5rem] left-0 right-0 bottom-0 bg-transparent -z-10 min-h-screen cursor-pointer',
          open ? 'block' : 'hidden'
        )}
        onClick={closeDrawer}
      />
      {/* main dropdown box */}
      <div
        className={clsx(
          'fixed top-[4.5rem] bottom-0 right-0 w-11/12 max-w-sm overflow-y-auto transition-all font-heading z-30 h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 text-xl shadow-xl border-l-[1px] border-l-slate-800/20 dark:border-l-slate-50/20',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="py-8 px-6 text-center">
          <ul className="flex flex-col mb-8 space-y-8">
            {menu.map(({ url, name }, index) => (
              <li key={index}>
                <NavLink to={url} tabIndex={tabIndex}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="flex justify-center text-2xl space-x-1">
            {socialLinks.map(({ name, icon, url }, index) => (
              <li key={index}>
                <SocialLink href={url} name={name} tabIndex={tabIndex}>
                  <Icon name={icon} />
                </SocialLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
