import React from 'react';
import clsx from 'clsx';

// types
import type { PolymorphicProps } from '@/utils/polymorphic';

type Props = {
  className?: string;
};

/**
 * Renders a block of content, styled with the site's default spacing for consistency.
 *
 * Should be used as a direct child of `<Layout>`, in order to maintain correct site layout.
 */
export const Section = <T extends React.ElementType = 'section'>({
  as,
  className = '',
  children,
}: PolymorphicProps<T, Props>) => {
  const Tag = as || 'section';
  return (
    <div
      className={clsx(
        'py-12 sm:py-16 md:py-20 px-6 md:px-12 transition-all bg-inherit text-inherit',
        className
      )}
    >
      <Tag className="max-w-site-sm md:max-w-site-md lg:max-w-site-lg mx-auto">
        {children}
      </Tag>
    </div>
  );
};
