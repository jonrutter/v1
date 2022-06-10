import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ColorThemeContextProvider } from '@/styles/useColorTheme';

const Wrapper: React.FC = ({ children }) => (
  <ColorThemeContextProvider>{children}</ColorThemeContextProvider>
);

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };
