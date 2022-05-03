import React from 'react';
import clsx from 'clsx';

type Props = {
  size?: 'sm' | 'md' | 'lg';
};

/**
 * Renders a spinner component.
 */
export const Spinner: React.FC<Props> = ({ size = 'md' }) => (
  <div
    className={clsx(
      'rounded-full border-[6px] border-b-cyan-500  animate-spin',
      size === 'sm' ? 'w-12 h-12' : size === 'md' ? 'w-20 h-20' : 'w-32 h-32'
    )}
  />
);
