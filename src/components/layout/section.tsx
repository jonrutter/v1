import React, { ComponentPropsWithoutRef, ElementType } from 'react';
import clsx from 'clsx';

type Props<T extends ElementType> = {
  as?: T;
  className?: string;
};

/**
 * Renders a block of content, styled with the site's default spacing for consistency.
 *
 * Should be used as a direct child of `<Layout>`, in order to maintain correct site layout.
 */
export const Section = <T extends ElementType = 'section'>({
  as,
  className = '',
  children,
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Tag = as || 'section';
  return (
    <div
      className={clsx(
        'py-8 md:py-20 px-6 md:px-12 transition-all bg-inherit text-inherit',
        className
      )}
    >
      <Tag className="max-w-xl md:max-w-screen-lg mx-auto">{children}</Tag>
    </div>
  );
};
