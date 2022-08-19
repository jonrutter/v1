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
        'group leading-none py-4 px-8 text-heading font-bold relative inline-block rounded-xl overflow-hidden z-10 transition-all shadow-lg text-lg font-heading bg-slate-900 text-white dark:bg-white dark:text-slate-900 outline-none ring-slate-900 ring-offset-white dark:ring-white dark:ring-offset-slate-900 ring-0 ring-offset-0 focus:ring-2 focus:ring-offset-2 hover:bg-slate-600 dark:hover:bg-slate-300',
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
        'group leading-none py-[calc(1rem-2px)] px-[calc(2rem-2px)] text-heading font-bold relative inline-block rounded-xl overflow-hidden z-10 transition-all shadow-lg text-lg font-heading bg-white text-slate-900  dark:focus:text-white focus:outline-none dark:bg-slate-900 dark:text-white dark:hover:text-white border-2 border-slate-900 dark:border-white outline-none ring-slate-900 ring-offset-white dark:ring-white dark:ring-offset-slate-900 ring-0 ring-offset-0 focus:ring-2 focus:ring-offset-2 hover:bg-slate-200 dark:hover:bg-slate-700',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/* ~~~ Push button ~~~ */

interface PushButtonProps
  extends React.PropsWithChildren<React.ComponentPropsWithoutRef<'button'>> {
  pressed: boolean;
}

export const PushButton: React.FC<PushButtonProps> = ({
  pressed,
  onClick,
  children,
  ...rest
}) => (
  <button
    aria-pressed={pressed}
    onClick={onClick}
    className={clsx(
      'rounded-xl transition-all border-2 py-1 px-2 md:py-2 md:px-4 shadow-lg outline-none ring-slate-900 ring-offset-white dark:ring-white dark:ring-offset-slate-900 ring-0 ring-offset-0 focus:ring-2 focus:ring-offset-2 font-bold',
      pressed
        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white hover:bg-slate-700 dark:hover:bg-slate-200'
        : 'border-slate-600 dark:border-slate-200 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 bg-white dark:bg-slate-900'
    )}
  >
    {children}
  </button>
);

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
        className="relative flex items-center justify-center group outline-none w-12 h-12 text-2xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:text-slate-900 dark:focus:text-white z-0"
        ref={ref}
      >
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 bottom-0 rounded-full transition-all-with-shadow border-2 border-slate-300 dark:border-slate-700 group-hover:border-slate-900 dark:group-hover:border-white group-focus:border-slate-900 dark:group-focus:border-white outline-none overflow-hidden"
        />
        {children}
      </Tag>
    );
  }
);
