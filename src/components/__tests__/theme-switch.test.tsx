import React from 'react';
import { prettyDOM, render, screen, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';
import { Helmet } from 'react-helmet';

// components
import { ThemeSwitch } from '../theme-switch';
import { ColorThemeContextProvider } from '@/styles/useColorTheme';

/*
  Because of the way the site renders the colorTheme, on the initial render the 
  colorTheme is undefined, which prevents the ThemeSwitch from rendering in the
  test by default. To avoid that, I explicitly pass an initial colorTheme to the 
  provider and use that as a wrapper to test the ThemeSwitch.
*/
const Component = (
  <ColorThemeContextProvider initial="light">
    <ThemeSwitch />
  </ColorThemeContextProvider>
);

describe('ThemeSwitch component', () => {
  it('renders the component correctly', () => {
    render(Component);
    screen.getByLabelText(/toggle between light and dark mode/i);
  });
  it('updates the color theme when toggled', async () => {
    render(Component);
    let toggle = screen.getByLabelText(/toggle between light and dark mode/i);
    // when the toggle is not checked, the site's colorTheme should be 'light'
    expect(toggle).not.toBeChecked();
    expect(toggle).toHaveAttribute('data-colortheme', 'light');

    await userEvent.click(toggle);

    await waitFor(() => {
      // when the toggle is checked, the site's colorTheme should be 'dark'
      expect(toggle).toBeChecked();
      expect(toggle).toHaveAttribute('data-colortheme', 'dark');
    });
  });
});
