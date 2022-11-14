/**
 * This code is adapted from a blog post by Josh W. Comeau.
 * Check it out here: https://www.joshwcomeau.com/react/the-perils-of-rehydration/
 * My modifications:
 * - convert to TypeScript
 * - add documentation
 */

import React, { useState, useEffect } from 'react';

/**
 * A custom hook to avoid React rehydration errors when
 * conditionally rendering client-only components.
 *
 * Useful for working with components that rely on browser APIs (like localStorage)
 * in SSR/SSG frameworks (like Gatsby) where the browser does not exist at
 * compile-time.
 *
 * Note: React requires that hooks be called before early returns, to ensure that
 * Hooks are called in the same order each time a component renders
 * (see https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level).
 * This module exports a ClientOnly helper component, which you can use to wrap your
 * entire client-only component if it relies on React hooks.
 *
 * @example
 * const hasMounted = useHasMounted();
 * if (!hasMounted) return null;
 * // render component or run client-side-only code
 */
export const useHasMounted = (): boolean => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
};

/**
 * Helper component to wrap React components that should only
 * be rendered in the client (in SSR/SSG frameworks). Any child
 * components will only render in the client after rehydration.
 *
 * Useful when you have client-only code that needs to use React hooks
 * (see https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level).
 *
 * @example
 * // only rendering a stateful component on the client
 * <ClientOnly>
 *   <StatefulComponent />
 * </ClientOnly>
 */
export const ClientOnly: React.FC = ({ children }) => {
  const hasMounted = useHasMounted();
  if (!hasMounted) return null;
  return <>{children}</>;
};
