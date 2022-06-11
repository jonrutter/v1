import React from 'react';
import clsx from 'clsx';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  open: boolean;
}

export const Hamburger: React.FC<Props> = ({ open, ...rest }) => (
  <button
    className={clsx(
      'hamburger hamburger--collapse rounded-md text-slate-900 dark:text-slate-50 hover:text-sea-600 dark:hover:text-sea-400',
      open && 'active'
    )}
    type="button"
    {...rest}
  >
    <span className="hamburger-box">
      <span className="hamburger-inner" />
    </span>
  </button>
);
