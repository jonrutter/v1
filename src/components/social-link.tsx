import React from 'react';

import clsx from 'clsx';

interface Props extends React.ComponentPropsWithoutRef<'a'> {
  className?: string;
  decorationClassName?: string;
  href: string;
  name: string;
}

/**
 * Renders a social media icon link.
 */
export const SocialLink: React.FC<Props> = ({
  className,
  decorationClassName,
  href,
  name,
  children,
  ...rest
}) => (
  <a
    target="_blank"
    href={href}
    rel="noreferrer"
    aria-label={name === 'Email Me' ? name : `My ${name}`}
    className={clsx(
      'p-4 inline-block text-2xl relative transition-all z-10 w-14 group outline-none focus:outline-none',
      className
    )}
    {...rest}
  >
    {children}
    <div
      aria-hidden
      className={clsx(
        'absolute -z-10 top-1 left-1 min-w-[3rem] min-h-[3rem] rounded-full transition-all bg-gradient-to-tl from-sky-500 to-cyan-300 scale-0 group-hover:scale-100 group-focus:scale-100 outline-none',
        decorationClassName
      )}
    />
  </a>
);
