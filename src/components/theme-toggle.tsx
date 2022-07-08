import React from 'react';
import clsx from 'clsx';

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
      <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full overflow-hidden">
        <div
          className={clsx(
            'absolute top-3 left-3 transition-all',
            colorTheme === 'dark' && '-translate-x-10'
          )}
        >
          <Icon name="sun" />
        </div>
        <div
          className={clsx(
            'absolute top-3 left-3  transition-all',
            colorTheme !== 'dark' && 'translate-x-10'
          )}
        >
          <Icon name="moon" />
        </div>
      </div>
    </AnimatedIconButton>
  );
};
