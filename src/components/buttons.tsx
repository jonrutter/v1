import React from 'react';
import { Link } from 'gatsby';
import clsx from 'clsx';

/* ~~~ Button Decorators ~~~ */

const Slider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`absolute -top-1 -bottom-1 -right-1 -left-1  -translate-x-full -z-10 transition-all group-hover:translate-x-0 ${className}`}
    data-testid="button-slider"
  />
);

/* ~~~ Primary Button ~~~ */

interface Props<T extends React.ElementType> {
  as?: T;
  className?: string;
}

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

/* ~~~ Secondary Button ~~~ */

/**
 * Renders the site's secondary button component
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
        'group leading-none py-[calc(1rem-2px)] px-[calc(2rem-2px)] text-heading font-bold relative inline-block rounded-lg overflow-hidden z-10 transition-all shadow-lg text-lg font-heading bg-white text-slate-900 focus:outline-none hover:text-slate-900 dark:bg-slate-900 dark:text-white border-2 border-slate-900 dark:border-white outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-white dark:focus:ring-offset-slate-900 dark:hover:text-slate-900',
        className
      )}
      {...rest}
    >
      {children}
      <Slider className="bg-sea-200" />
    </Tag>
  );
};

/* ~~~ Icon button ~~~ */

interface IBProps<T extends React.ElementType> extends Props<T> {
  fontSize?: number;
}

/**
 * Icon button
 */
export const IconButton = <T extends React.ElementType = typeof Link>({
  as,
  fontSize = 6,
  className = '',
  children,
  ...rest
}: IBProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof IBProps<T>>) => {
  const Tag = as || Link;
  return (
    <Tag
      className={clsx(
        'relative flex items-center justify-center group outline-none',
        className
      )}
      style={{
        width: `${(fontSize * 2) / 4}rem`,
        height: `${(fontSize * 2) / 4}rem`,
        fontSize: `${fontSize / 4}rem`,
      }}
      {...rest}
    >
      {children}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 bottom-0 rounded-full transition-all border-2 border-current opacity-0 group-hover:opacity-100 group-focus:opacity-100 outline-none overflow-hidden"
      />
    </Tag>
  );
};

      />
    </Tag>
  );
};
