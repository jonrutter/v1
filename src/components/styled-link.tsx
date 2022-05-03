import React from 'react';
import clsx from 'clsx';
import { Link } from 'gatsby';

type Props<T extends React.ElementType> = {
  as?: T;
  className: string;
};

/**
 * A styled polymorphic link component, that renders a styled GatsbyLink by default.
 *
 * Styling: the className prop is passed directly to the underlying component. Because the underline indicator and focus ring colors are based on the currentColor of the text, all you need to do to change the link's color is add classNames for the text-color, and the rest are styled automatically.
 *
 * @param props.as - The underlying component.
 *
 * All other props are passed directly to the underlying component.
 */
export const StyledLink = <T extends React.ElementType = typeof Link>({
  as,
  className,
  children,
  ...rest
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Tag = as || Link;
  return (
    <Tag
      className={clsx(
        'leading-none overflow-hidden pb-1 relative transition-all before:block before:absolute before:bottom-0 before:left-underline before:h-[3px] before:w-6 before:rounded-md before:transition-all before:bg-current before:scale-x-0 hover:before:scale-x-100 outline-none focus:outline-none p-1 focus:ring-2 focus:ring-current',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};
