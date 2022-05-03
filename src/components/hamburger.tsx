import React from 'react';
import clsx from 'clsx';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  open: boolean;
}

export const Hamburger: React.FC<Props> = ({ open, ...rest }) => (
  <button
    className={clsx('hamburger hamburger--collapse', open && 'active')}
    type="button"
    {...rest}
  >
    <span className="hamburger-box">
      <span className="hamburger-inner"></span>
    </span>
  </button>
);
