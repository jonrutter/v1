import React from 'react';
import clsx from 'clsx';

type Props = {
  short?: boolean;
};

/**
 * Renders a page's hero section.
 */
export const Hero: React.FC<Props> = ({ children, short }) => (
  <div
    className={clsx(
      'py-12 px-6 md:py-24 md:px-12 transition-all lg:flex lg:justify-center lg:items-center bg-white dark:bg-slate-900 text-base md:text-lg',
      !short && 'lg:min-h-[calc(100vh-5rem)]'
    )}
  >
    <div className="mx-auto max-w-prose">{children}</div>
  </div>
);
