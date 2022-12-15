import React from 'react';

import { ColorThemeContextProvider } from '@/hooks/useColorTheme';

/**
 * Wraps all pages on the site.
 *
 * Currently includes the `<ColorThemeContextProvider />`
 */
export const PageWrap: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ColorThemeContextProvider>{children}</ColorThemeContextProvider>;
};
