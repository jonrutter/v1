import React from 'react';
import { Link } from 'gatsby';
import clsx from 'clsx';

/* ~~~ Button Decorators ~~~ */

const Slider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`absolute -top-1 -bottom-1 -right-1 -left-1  -translate-x-full -z-10 transition-all group-hover:translate-x-0 ${className}`}
  />
);

/* ~~~ Primary Button ~~~ */

type Props<T extends React.ElementType> = {
  as?: T;
  className?: string;
};

/**
 * Renders the site's primary button component
 *
 * A polymorphic component, supports rendering as `<button>`, `<a>`, or `<Link>`
 */
export const PrimaryButton = <T extends React.ElementType = typeof Link>({
  as,
  className = '',
  children,
  ...rest
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Tag = as || Link;
  return (
    <Tag
      className={clsx(
        'group leading-none py-4 px-8 text-heading font-bold relative inline-block rounded-lg overflow-hidden z-10 transition-all shadow-lg text-lg font-heading bg-slate-900 text-white focus:outline-none hover:text-slate-900 dark:bg-white dark:text-slate-900 outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-white dark:focus:ring-offset-slate-900',
        className
      )}
      {...rest}
    >
      {children}
      <Slider className="bg-sea-200" />
    </Tag>
  );
};

/* ~~~ Primary Button ~~~ */

/**
 * Renders the site's primary button component
 *
 * A polymorphic component, supports rendering as `<button>`, `<a>`, or `<Link>`
 */
export const SecondaryButton = <T extends React.ElementType = typeof Link>({
  as,
  className = '',
  children,
  ...rest
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Tag = as || Link;
  return (
    <Tag
      className={clsx(
        'group leading-none py-[calc(1rem-2px)] px-[calc(2rem-2px)] text-heading font-bold relative inline-block rounded-lg overflow-hidden z-10 transition-all shadow-lg text-lg font-heading bg-white text-slate-900 focus:outline-none hover:text-slate-900 dark:bg-slate-900 dark:text-white border-2 border-slate-900 dark:border-white outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-white dark:focus:ring-offset-slate-900',
        className
      )}
      {...rest}
    >
      {children}
      <Slider className="bg-sea-200" />
    </Tag>
  );
};
