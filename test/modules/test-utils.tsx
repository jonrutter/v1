import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ColorThemeContextProvider } from '@/hooks/useColorTheme';

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ColorThemeContextProvider>{children}</ColorThemeContextProvider>
);

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };
