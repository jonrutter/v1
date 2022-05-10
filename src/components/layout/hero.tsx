import React from 'react';
import clsx from 'clsx';

type Props = {
  content: React.ReactChild;
  image: React.ReactChild;
  short?: boolean;
};

/**
 * Renders a page's hero section.
 */
export const Hero: React.FC<Props> = ({ content, short, image }) => (
  <div
    className={clsx(
      'pt-16 md:pt-28 lg:pt-8 pb-8 px-6 md:px-12 transition-all flex justify-center items-center text-lg bg-white dark:bg-slate-900',
      !short && 'min-h-screen'
    )}
  >
    <div className="max-w-site-full mx-auto grid grid-cols-1 items-center gap-4 pb-8 lg:grid-cols-2 lg:gap-6">
      <div className="max-w-lg lg:max-w-full">{content}</div>
      <div className="max-w-lg lg:max-w-full lg:justify-self-end">{image}</div>
    </div>
  </div>
);
