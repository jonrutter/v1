import React from 'react';
import { Link } from 'gatsby';
import { BsArrowRight } from 'react-icons/bs';

/* ~~~ Button Decorator Components ~~~ */

type DecoratorProps = {
  className?: string;
};

const Slider: React.FC<DecoratorProps> = ({ className }) => (
  <div
    className={` absolute -top-1 -bottom-1 -right-1 -left-1  -translate-x-full -z-10 transition-all group-hover:translate-x-0 group-focus:translate-x-0 ${className}`}
  />
);

const Arrow: React.FC<DecoratorProps> = ({ className }) => (
  <BsArrowRight
    className={`transition-all text-2xl leading-none absolute top-3 right-2 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 ${className}`}
    aria-hidden
  />
);

/* ~~~ Base Button Component ~~~ */

type ButtonProps<T extends React.ElementType> = {
  as?: T;
  variant?: 'slide' | 'arrow';
  className?: string;
  decorationClassName?: string;
};

/**
 * Polymorphic button component with minimal styling.
 *
 * @param props.as - Underlying component. Intended to be 'a', 'button', or GatsbyLink
 * @param props.variant - Supports to variants: 'slide' and 'arrow'. Adds additional styling.
 * @param props.className - Passed to underlying component.
 * @param props.decorationClassName - Passed to the decoration component (if applicable).
 *
 */
export const ButtonBase = <T extends React.ElementType = 'button'>({
  children,
  variant,
  as,
  className: propClassName,
  decorationClassName,
  ...rest
}: ButtonProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) => {
  // determining the underlying component
  // const Tag = as === 'link' ? Link : as === 'a' ? 'a' : 'button';

  const Tag = as || 'button';

  // determining the type of decoration
  const decorator =
    variant === 'slide' ? (
      <Slider className={decorationClassName} />
    ) : variant === 'arrow' ? (
      <Arrow className={decorationClassName} />
    ) : null;

  return (
    <Tag
      className={`group leading-none py-4 px-8 text-heading font-bold relative inline-block rounded-4xl overflow-hidden z-10 transition-all shadow-lg ${propClassName}`}
      {...rest}
    >
      {children}
      {decorator}
    </Tag>
  );
};

/* ~~~ CTAButton Component ~~~ */

type CTAButtonProps = {
  to?: string;
};

export const CTAButton: React.FC<CTAButtonProps> = ({
  to = '/contact',
  children,
}) => (
  <ButtonBase
    as={Link}
    variant="slide"
    to={to}
    className="bg-gradient-to-br from-sea-300 to-sea-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-50 text-lg font-heading font-bold leading-none"
    decorationClassName="bg-sea-200"
  >
    {children}
  </ButtonBase>
);

export const WhiteButton: React.FC<CTAButtonProps> = ({
  to = '/contact',
  children,
}) => (
  <ButtonBase
    as={Link}
    variant="slide"
    to={to}
    className="bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-50 text-lg font-heading font-bold leading-none"
    decorationClassName="bg-sea-200"
  >
    {children}
  </ButtonBase>
);
