import React from 'react';
import clsx from 'clsx';

// icons
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

import { useColorThemeContext } from '../styles/useColorTheme';

/**
 * Renders a toggle switch for changing the site color theme.
 */
export const ThemeSwitch = () => {
  const { colorTheme, toggleColorTheme } = useColorThemeContext();

  if (!colorTheme) return null;

  const toggleChecked = (e: React.ChangeEvent<HTMLInputElement>) =>
    toggleColorTheme(e.target.checked ? 'dark' : 'light');

  return (
    <label
      htmlFor="light-dark-switch"
      className="relative inline-block w-[54px] h-[28px] select-none cursor-pointer group"
    >
      <span className="sr-only">Toggle between light and dark mode</span>
      <div className="absolute pointer top-0 left-0 right-0 bottom-0 bg-transparent transition-all duration-300 rounded-4xl z-[31] text-slate-50">
        <input
          id="light-dark-switch"
          type="checkbox"
          checked={colorTheme === 'dark'}
          onChange={toggleChecked}
          className="sr-only peer"
        />
        <div className="absolute top-[3px] left-[2px] right-[2px] bottom-[3px] bg-slate-600 rounded-full" />

        <div
          className={clsx(
            'absolute top-[1px] h-[26px] w-[26px] rounded-full bg-slate-50 transition-toggle z-[32] group-hover:ring-4 border-[1px]border-slate-600 peer-focus:ring-4 ring-sea-500 dark:ring-sea-400 border-[1px] border-slate-600',
            colorTheme === 'dark' ? 'right-[1px]' : 'right-[27px]'
          )}
        />
        <div className="absolute text-lg top-[7px] w-[18px]transition-all flex justify-center items-center left-[5px]">
          <BsMoonFill aria-hidden className="text-sm" />
        </div>
        <div className="absolute text-lg top-[7px] w-[18px]transition-all flex justify-center items-center right-[5px]">
          <BsSunFill aria-hidden className="text-sm" />
        </div>
      </div>
    </label>
  );
};
