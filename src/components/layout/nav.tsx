import React, { useState, FC, Fragment } from 'react';

// components
import { Dialog, Transition } from '@headlessui/react';
import { RingButton, Icon, IconButton } from '@/components';
import { StyledLink } from '../styled-link';
import { Logo } from '../logo';
import { ThemeToggle } from '../theme-toggle';

// data
import { menu, socialLinks } from '@/config';

// ~~~ Nav Bar ~~~
const NavLinks: FC = () => (
  <>
    {menu.map((link) => (
      <li key={link.name}>
        <StyledLink
          to={link.url}
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
          target="_blank"
          rel="noreferrer"
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

type NavButtonProps = {
  open: boolean;
  onClick: () => void;
};

const NavButton: FC<NavButtonProps> = ({ open, onClick }) => (
  <RingButton
    aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
    title={open ? 'Close navigation menu' : 'Open navigation menu'}
    onClick={onClick}
  >
    {open ? <Icon name="close" /> : <Icon name="menu" />}
  </RingButton>
);

// ~~~ Nav Dialog ~~~

type NavDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const NavDialog: FC<NavDialogProps> = ({ open, onClose }) => {
  const handleClose = () => onClose();

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={handleClose} className="relative z-30">
        <Transition.Child
          as={Fragment}
          enter="transition-all"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition delay-150 duration-300 ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            aria-hidden={true}
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition delay-150 duration-300 ease-in-out"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition-all"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div
            className="fixed inset-0"
            id="nav-drawer"
            data-testid="nav-drawer"
          >
            <Dialog.Panel className="fixed top-0 right-0 w-10/12 max-w-sm overflow-y-auto transition-all font-heading h-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 text-xl shadow-xl border-l-[1px] border-l-slate-800/20 dark:border-l-slate-50/20 translate-x-0">
              <div className="py-8 px-8 md:px-12 flex justify-end">
                <NavButton open={open} onClick={handleClose} />
              </div>
              <div className="py-8 px-6 text-center">
                <ul className="flex flex-col mb-12 space-y-8">
                  <NavLinks />
                </ul>
                <ul className="flex justify-center text-2xl space-x-4 mb-12">
                  <SocialLinks />
                </ul>
                <div className="flex items-center justify-center">
                  <ThemeToggle />
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

/**
 * The main navigation.
 */
export const Nav: FC = () => {
  // state for opening and closing the nav drawer
  const [dialogOpen, setDialogOpen] = useState(false);
  const toggleDialog = () => setDialogOpen((open) => !open);
  const closeDialog = () => setDialogOpen(false);

  return (
    <nav className="py-8 lg:py-12 px-6 md:px-12 w-full z-40 transition-all text-slate-900 dark:text-slate-50 motion-reduce:!translate-y-0 bg-transparent">
      <div className="max-w-site-full mx-auto flex justify-between items-center">
        <div className="max-w-[3rem] h-auto">
          <Logo />
        </div>
        <ul className="hidden md:flex items-center space-x-8 font-heading font-medium text-lg text-slate-600 dark:text-slate-300">
          <NavLinks />
        </ul>
        <ul className="hidden lg:flex space-x-4 items-center">
          <SocialLinks />
        </ul>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <div className="block lg:hidden">
            <NavButton open={dialogOpen} onClick={toggleDialog} />
          </div>
        </div>
        <NavDialog open={dialogOpen} onClose={closeDialog} />
      </div>
    </nav>
  );
};
