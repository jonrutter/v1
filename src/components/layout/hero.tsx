import React from 'react';
import clsx from 'clsx';

type Props = {
  short?: boolean;
  title: string;
  subtitle?: string;
};

/**
 * Renders a page's hero section.
 */
export const Hero: React.FC<Props> = ({ title, subtitle, short, children }) => (
  <>
    {/* outer wrapper: bg color, padding, full-width */}
    <div
      className={clsx(
        'py-12 px-6 md:py-24 md:px-12 transition-all bg-white dark:bg-slate-900 text-base sm:text-lg lg:flex lg:items-center',
        !short && 'lg:min-h-[calc(100vh-5rem)]'
      )}
    >
      {/* inner wrapper: flex container for inner alignment, content max width, centered */}
      <div
        className={clsx(
          'max-w-site-sm md:max-w-site-md lg:max-w-site-lg mx-auto'
        )}
      >
        <div className="max-w-prose">
          {/* hero content */}
          <div className="mb-6 md:mb-8 relative z-10 inline-block">
            <h1
              className={clsx(
                'transition-all font-heading font-black text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-white',
                subtitle ? 'mb-3 md:mb-4' : 'mb-0'
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <h2 className="transition-all font-heading font-black text-2xl md:text-3xl lg:text-4xl text-slate-800 dark:text-slate-100">
                {subtitle}
              </h2>
            )}
            <div className="shine opacity-50 dark:opacity-40" />
          </div>
          {/* everything that should appear below the heading */}
          {children}
        </div>
      </div>
    </div>
  </>
);
