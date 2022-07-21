import React from 'react';

/**
 * The polymorphic 'as' prop:
 * Used to modify the polymorphic component's type.
 * Can be either an HTML intrinsic element or a React
 * component.
 */
type As<T extends React.ElementType> = {
  as?: T;
};

/**
 * Returns the intrinsic attributes from the passed
 * element type, without any members of passed props object
 */
type InheritedProps<T extends React.ElementType, P = {}> = Omit<
  React.ComponentPropsWithoutRef<T>,
  keyof P
>;

/**
 * Returns the intrinsic attributes from the passed
 * element type, along with all passed props, and the
 * polymorphic 'as' prop
 */
export type PolymorphicProps<T extends React.ElementType, P = {}> = P &
  As<T> &
  InheritedProps<T, P & As<T>>;

/**
 * A React ref, whose type is inferred from the
 * passed element type
 */
export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>['ref'];

/**
 * An expansions of PolymorphicProps with support for ref
 * forwarding
 */
export type PolymorphicPropsWithRef<
  T extends React.ElementType,
  P = {}
> = PolymorphicProps<T, P> & { ref?: PolymorphicRef<T> };

/**
 * A polymorphic React component with support for ref
 * forwarding.
 *
 * Accepts two type parameters:
 *
 * P: the component's base props
 *
 * D: the component's default element type
 */
export type PolymorphicComponent<
  P = {},
  D extends React.ElementType = 'div'
> = <T extends React.ElementType = D>(
  props: PolymorphicPropsWithRef<T, P>
) => React.ReactElement | null;

/**
 * A polymorphic React component with support for ref
 * forwarding.
 *
 * Accepts two type parameters:
 *
 * P: the component's base props
 *
 * D: the component's default element type
 */
export type PC<
  P = {},
  D extends React.ElementType = 'div'
> = PolymorphicComponent<P, D>;
