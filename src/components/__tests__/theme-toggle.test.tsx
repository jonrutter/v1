import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';

// components
import { ThemeToggle } from '../theme-toggle';
import { ColorThemeContextProvider } from '@/hooks/useColorTheme';

/*
  Because of the way the site renders the colorTheme, on the initial render the 
  colorTheme is undefined, which prevents the ThemeSwitch from rendering in the
  test by default. To avoid that, I explicitly pass an initial colorTheme to the 
  provider and use that as a wrapper to test the ThemeSwitch.
*/
const Component = (
  <ColorThemeContextProvider initial="light">
    <ThemeToggle />
  </ColorThemeContextProvider>
);

describe('ThemeToggle component', () => {
  it('renders the component correctly', () => {
    render(Component);
    screen.getByLabelText(/toggle dark mode/i);
  });
  it('updates the color theme when toggled', async () => {
    render(Component);
    const toggle = screen.getByLabelText(/toggle dark mode/i);
    // when the toggle is not pressed, the site's colorTheme should be 'light'
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    expect(toggle).toHaveAttribute('data-colortheme', 'light');

    await userEvent.click(toggle);

    await waitFor(() => {
      // when the toggle is checked, the site's colorTheme should be 'dark'
      expect(toggle).toHaveAttribute('aria-pressed', 'true');
      expect(toggle).toHaveAttribute('data-colortheme', 'dark');
    });
    await userEvent.click(toggle);
    await userEvent.click(toggle);
    await userEvent.click(toggle);
  });
});
