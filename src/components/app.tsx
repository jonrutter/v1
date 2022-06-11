import React from 'react';

import { ColorThemeContextProvider } from '@/styles/useColorTheme';

import { BlogCard } from './cards';

/**
 * Wraps all pages on the site.
 *
 * Currently includes the `<ColorThemeContextProvider />`
 */
export const PageWrap: React.FC = ({ children }) => {
  return (
    <ColorThemeContextProvider>
      {children}
      <BlogCard />
    </ColorThemeContextProvider>
  );
};
