/**
 * Exports typographic components:
 * - `<H1>` - `<H6>`, `<P>`: styled header components
 * - Type: base polymorphic typographic component, accepts 'as', 'variant', and 'className' props for fine-grained control over rendering of typography
 */

import clsx from 'clsx';
import React from 'react';

/* 
  This is my hack-y solution to TailwindCSS intellisense only seeming to provide syntax highlight and autocorrection when prefaced by 'className'. I'm creating a className binding so the font classes are easier to manage, then reassigning them to a typographicStyles binding (because there is already a className declared in Type)
*/
const className = {
  h1: 'font-heading font-black text-4xl sm:text-5xl sm:leading-snug xl:text-6xl xl:leading-tight mb-4 md:mb-5 text-slate-900 dark:text-slate-50 transition-all',
  h2: 'font-heading font-black text-[1.75rem] md:text-[2.75rem] text-slate-900 dark:text-slate-50 transition-all',
  h3: 'font-heading font-bold text-xl md:text-2xl leading-tight my-4 text-slate-900 dark:text-slate-50 transition-all',
  h4: 'font-heading font-bold text-lg md:text-xl leading-tight my-4 text-slate-700 dark:text-slate-200 transition-all',
  h5: 'font-heading font-bold text-lg md:text-lg leading-tight my-4 text-slate-700 dark:text-slate-200 transition-all',
  h6: 'font-heading font-bold text-base md:text-lg leading-tight my-4 text-slate-700 dark:text-slate-200 transition-all',
  p: 'font-sans text-slate-700 dark:text-slate-200',
};
const typographicStyles = className;

// types
type TypeProps<T extends React.ElementType> = {
  as?: T;
  variant?: keyof typeof typographicStyles;
  className?: string;
};

/**
 * Base typographic polymorphic component. Can be used to create custom typographic styles
 *
 * @param props.as - Underlying component, defaults to 'span'
 * @param props.variant - Used to add pre-defined theme styles from a different heading type.
 *
 * All other props are passed directly to the underlying component
 *
 * @example
 * // renders an `<h1>` component with styles to look like an `<h2>`
 * <Type as="h1" variant="h2" />
 */
export const Type = <T extends React.ElementType = 'span'>({
  as,
  variant,
  className = '',
  children,
  ...rest
}: TypeProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TypeProps<T>>) => {
  const Tag = as || 'span';
  const styles = variant ? typographicStyles[variant] : '';
  return (
    <Tag {...rest} className={clsx(styles, className)}>
      {children}
    </Tag>
  );
};

/**
 * Renders a themed `<h1>` tag
 */
export const H1: React.FC<React.ComponentPropsWithoutRef<'h1'>> = ({
  children,
  ...rest
}) => (
  <Type as="h1" {...rest} variant="h1">
    {children}
  </Type>
);

/**
 * Renders a themed `<h2>` tag
 */
export const H2: React.FC<React.ComponentPropsWithoutRef<'h2'>> = ({
  children,
  ...rest
}) => (
  <Type as="h2" {...rest}>
    {children}
  </Type>
);

/**
 * Renders a themed `<h3>` tag
 */
export const H3: React.FC<React.ComponentPropsWithoutRef<'h3'>> = ({
  children,
  ...rest
}) => (
  <Type as="h3" {...rest}>
    {children}
  </Type>
);

/**
 * Renders a themed `<h4>` tag
 */
export const H4: React.FC<React.ComponentPropsWithoutRef<'h4'>> = ({
  children,
  ...rest
}) => (
  <Type as="h4" {...rest}>
    {children}
  </Type>
);

/**
 * Renders a themed `<h5>` tag
 */
export const H5: React.FC<React.ComponentPropsWithoutRef<'h5'>> = ({
  children,
  ...rest
}) => (
  <Type as="h5" {...rest}>
    {children}
  </Type>
);

/**
 * Renders a themed `<h6>` tag
 */
export const H6: React.FC<React.ComponentPropsWithoutRef<'h6'>> = ({
  children,
  ...rest
}) => (
  <Type as="h6" {...rest}>
    {children}
  </Type>
);

/**
 * Renders a themed `<p>` tag
 */
export const P: React.FC<React.ComponentPropsWithoutRef<'p'>> = ({
  children,
  ...rest
}) => (
  <Type as="p" {...rest}>
    {children}
  </Type>
);
