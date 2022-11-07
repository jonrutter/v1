import React from 'react';
import { Link } from 'gatsby';
import clsx from 'clsx';

// types
import type {
  PolymorphicProps,
  PolymorphicRef,
  PolymorphicPropsWithRef,
  PC,
} from '@/utils/polymorphic';

/* ~~~ Primary Button ~~~ */

interface Props {
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
}: PolymorphicProps<T, Props>) => {
  const Tag = as || Link;
  return (
    <Tag
      className={clsx(
        'group leading-none py-4 px-8 text-heading font-bold relative inline-block rounded-xl overflow-hidden z-10 transition-all shadow-lg text-lg font-heading bg-sky-700 text-white outline-none ring-slate-900 ring-offset-white dark:ring-white dark:ring-offset-slate-900 ring-0 ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-2 hover:bg-sky-600',
        className
      )}
      {...rest}
    >
      {children}
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
}: PolymorphicProps<T, Props>) => {
  const Tag = as || Link;
  return (
    <Tag
      className={clsx(
        'group leading-none py-[calc(1rem-2px)] px-[calc(2rem-2px)] text-heading font-bold relative inline-block rounded-xl overflow-hidden z-10 transition-all shadow-lg text-lg font-heading bg-transparent text-sky-700  dark:focus-visible:text-white focus:outline-none dark:text-sky-200 border-2 border-sky-700 dark:border-sky-200 outline-none ring-slate-900 ring-offset-white dark:ring-white dark:ring-offset-slate-900 ring-0 ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-2 hover:bg-sky-50 dark:hover:bg-sky-900',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/* ~~~ Icon button ~~~ */

type IBProps = {
  fontSize?: number;
} & Props;

/**
 * Icon button
 */
export const IconButton = <T extends React.ElementType = typeof Link>({
  as,
  fontSize = 6,
  className = '',
  children,
  ...rest
}: PolymorphicProps<T, IBProps>) => {
  const Tag = as || Link;
  return (
    <Tag
      className={clsx(
        'relative flex items-center justify-center group outline-none transition-all',
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

/**
 * A polymorphic svg animated icon button
 *
 * Used for niche cases around the site: such as the hamburger menu button and light/dark toggle
 *
 * Supports ref forwarding
 */
export const RingButton: PC<IBProps, 'button'> = React.forwardRef(
  <T extends React.ElementType = 'button'>(
    { as, children, ...rest }: PolymorphicPropsWithRef<T, IBProps>,
    ref?: PolymorphicRef<T>
  ) => {
    const Tag = as || 'button';

    return (
      <Tag
        {...rest}
        className="relative flex items-center justify-center group outline-none w-12 h-12 text-2xl text-slate-900 dark:text-white z-0 bg-white dark:bg-slate-800 transition-all rounded-full"
        ref={ref}
      >
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 bottom-0 rounded-full transition-all-with-shadow border-2 border-slate-400 group-hover:border-slate-900 dark:group-hover:border-white group-focus-visible:border-slate-900 dark:group-focus-visible:border-white outline-none overflow-hidden"
        />
        {children}
      </Tag>
    );
  }
);
