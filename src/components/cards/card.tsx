import React from 'react';
import clsx from 'clsx';

/* ~~~ Card Base ~~~ */

type CardProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
};

/**
 * Renders a polymorphic, styled card component.
 */
export const Card = <T extends React.ElementType = 'div'>({
  as,
  className = '',
  children,
}: CardProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof CardProps<T>>) => {
  const Tag = as || 'div';
  return (
    <Tag
      className={clsx(
        'py-6 px-8 sm:py-8 sm:px-12 bg-white dark:bg-slate-900 rounded-4xl shadow-xl transition-all',
        className
      )}
    >
      {children}
    </Tag>
  );
};
