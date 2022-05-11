import React from 'react';
import clsx from 'clsx';

type Props<T extends React.ElementType> = {
  as?: T;
  className?: string;
  size?: number;
};

/**
 * Polymorphic component providing standardized vertical spacing between a group of children
 */
export const Flow = <T extends React.ElementType = 'div'>({
  as,
  className,
  children,
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Tag = as || 'div';

  return (
    <Tag className={clsx('space-y-8 md:space-y-10 lg:space-y-14', className)}>
      {children}
    </Tag>
  );
};
