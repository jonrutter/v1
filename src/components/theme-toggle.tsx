import React from 'react';

// components
import { Icon } from './icon';
import { AnimatedIconButton } from './buttons';

// hooks
import { useColorThemeContext } from '@/styles/useColorTheme';

export const ThemeToggle = () => {
  const { colorTheme, toggleColorTheme } = useColorThemeContext();
  if (!colorTheme) return null;

  return (
    <AnimatedIconButton
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      aria-pressed={colorTheme === 'dark'}
      data-colortheme={colorTheme}
      onClick={() =>
        toggleColorTheme(colorTheme === 'light' ? 'dark' : 'light')
      }
    >
      {colorTheme === 'dark' ? <Icon name="moon" /> : <Icon name="sun" />}
    </AnimatedIconButton>
  );
};
