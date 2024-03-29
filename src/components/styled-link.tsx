import React from 'react';
import { Link } from 'gatsby';
import clsx from 'clsx';

// types
import type { PolymorphicProps } from '@/utils/polymorphic';

type Props = {
  className?: string;
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
  className = '',
  children,
  ...rest
}: PolymorphicProps<T, Props>) => {
  const Tag = as || Link;
  return (
    <Tag
      className={clsx(
        'overflow-hidden relative transition-all before:block before:absolute before:bottom-0 before:left-1/4 before:h-[3px] before:w-1/2 before:rounded-sm before:transition-all before:bg-current before:scale-x-0 hover:before:scale-x-100 focus:before:scale-x-100 outline-none pb-1',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};
