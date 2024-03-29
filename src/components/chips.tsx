import React from 'react';
import { Link } from 'gatsby';
import clsx from 'clsx';

// types
import type { PolymorphicProps } from '@/utils/polymorphic';

type Props = {
  color?: string;
};

/**
 * returns whether the passed color is a valid color hex code
 */
const isValidColor = (color: any) => {
  if (typeof color !== 'string') return false;
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color);
};

/**
 * A polymorphic chip component
 */
export const Chip = <T extends React.ElementType = 'div'>({
  as,
  color,
  children,
  ...rest
}: PolymorphicProps<T, Props>) => {
  // generate tag
  const Tag = as || 'div';
  const interactive = as === 'button' || as === 'a' || as === typeof Link; // whether the chip is clickable
  const displayColor = isValidColor(color) ? color : '#0f172a';
  return (
    <Tag
      className={clsx(
        'inline-block border-[1px] rounded-full py-1 px-3 transition-all relative group z-0 overflow-hidden',
        interactive &&
          'outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900'
      )}
      style={{ borderColor: displayColor }}
      {...rest}
    >
      <div
        className={clsx(
          'absolute top-0 left-0 right-0 bottom-0 -z-10 opacity-0 rounded-full transition-all',
          interactive && 'group-hover:opacity-20 group-focus:opacity-20'
        )}
        style={{ backgroundColor: displayColor }}
      />
      {children}
    </Tag>
  );
};
