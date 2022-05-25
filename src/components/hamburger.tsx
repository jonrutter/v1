import React from 'react';
import clsx from 'clsx';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  open: boolean;
}

export const Hamburger: React.FC<Props> = ({ open, ...rest }) => (
  <button
    className={clsx(
      'hamburger hamburger--collapse rounded-md focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-50',
      open && 'active'
    )}
    type="button"
    {...rest}
  >
    <span className="hamburger-box">
      <span className="hamburger-inner"></span>
    </span>
  </button>
);
