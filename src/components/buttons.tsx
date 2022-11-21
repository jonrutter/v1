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

/* ~~~ Button ~~~ */
interface Props {
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const Button = <T extends React.ElementType = typeof Link>({
  as,
  variant = 'primary',
  className = '',
  children,
  ...rest
}: PolymorphicProps<T, Props>) => {
  const Tag = as || Link;
  return (
    <Tag
      className={clsx(
        'leading-none text-heading font-bold inline-block rounded-xl overflow-hidden transition-all shadow-md text-lg font-heading outline-none ring-0 ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-2 ring-slate-900 ring-offset-white dark:ring-white dark:ring-offset-slate-900',
        className,
        variant === 'primary'
          ? 'py-4 px-8 bg-sky-700 text-white hover:bg-sky-600'
          : 'py-[calc(1rem-2px)] px-[calc(2rem-2px)] bg-transparent text-sky-700 dark:text-white hover:bg-sky-50 dark:hover:bg-sky-900 border-2 border-sky-700 dark:border-white'
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
