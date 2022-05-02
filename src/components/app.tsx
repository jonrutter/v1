import React from 'react';

import { ColorThemeContextProvider } from '../styles/useColorTheme';

/**
 * Wraps all pages on the site.
 *
 * Currently includes the `<ColorThemeContextProvider />`
 */
export const PageWrap: React.FC = ({ children }) => {
  return <ColorThemeContextProvider>{children}</ColorThemeContextProvider>;
};
