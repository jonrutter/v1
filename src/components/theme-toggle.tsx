import React, { useState } from 'react';
import clsx from 'clsx';

// components
import { Icon } from './icon';
import { RingButton } from './buttons';

// hooks
import { useColorThemeContext, ColorTheme } from '@/hooks/useColorTheme';

type SlideIndex = 0 | 1 | 2 | 3;

type SlideProps = {
  colorTheme: ColorTheme;
  index: SlideIndex;
  current: SlideIndex;
  icon: 'sun' | 'moon';
};

const SlideIcon: React.FC<SlideProps> = ({
  colorTheme,
  index,
  current,
  icon,
}) => {
  let state = 'inactive';
  if (current === index) state = 'active';
  else if (index + 1 === current || (current === 0 && index === 3))
    state = 'prev';
  else if (current === index - 1 || (current === 3 && index === 0))
    state = 'next';

  const className = {
    inactive: 'transition-none rotate-90',
    active: 'transition-all rotate-0',
    next: 'transition-all rotate-90',
    prev: 'transition-all -rotate-90',
  };
  return (
    <div
      className={clsx(
        'absolute top-3 left-3 -z-10',
        className[state as keyof typeof className]
      )}
      style={{ transformOrigin: '50% 5rem', transitionDuration: '600ms' }}
    >
      <Icon name={icon} />
    </div>
  );
};

export const ThemeToggle = () => {
  const { colorTheme, toggleColorTheme } = useColorThemeContext();
  const [index, setIndex] = useState<SlideIndex>(
    colorTheme ? (colorTheme === 'light' ? 0 : 1) : 0
  );

  // do not render if there is no context value
  if (!colorTheme) return null;

  // hacky fix for rehydration issue where index can get out of sync with colorTheme when initial theme is dark
  if (colorTheme === 'light' && index % 2 !== 0) setIndex(0);
  else if (colorTheme === 'dark' && index % 2 === 0) setIndex(1);

  const handleClick = () => {
    setIndex((prev) => (prev >= 3 ? 0 : ((prev + 1) as SlideIndex)));
    toggleColorTheme(colorTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <RingButton
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      aria-pressed={colorTheme === 'dark'}
      data-colortheme={colorTheme}
      onClick={handleClick}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full overflow-hidden">
        <SlideIcon
          colorTheme={colorTheme}
          index={0}
          current={index}
          icon={'sun'}
        />
        <SlideIcon
          colorTheme={colorTheme}
          index={1}
          current={index}
          icon={'moon'}
        />
        <SlideIcon
          colorTheme={colorTheme}
          index={2}
          current={index}
          icon={'sun'}
        />
        <SlideIcon
          colorTheme={colorTheme}
          index={3}
          current={index}
          icon={'moon'}
        />
      </div>
    </RingButton>
  );
};
