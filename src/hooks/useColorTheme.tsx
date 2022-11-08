/*
This code was adapted from a blog post by Josh W. Comeau. Check out the original: https://www.joshwcomeau.com/react/dark-mode/
Modifications: converted to TypeScript, adapted to Tailwind CSS, a little refactoring.
*/

import React, { useState, useEffect, useContext } from 'react';

// types
export type ColorTheme = 'light' | 'dark' | undefined;

type ContextValueType = {
  colorTheme: ColorTheme;
  toggleColorTheme: (colorTheme: ColorTheme) => void;
};

// context
const defaultContext: ContextValueType = {
  colorTheme: undefined,
  toggleColorTheme: (_: ColorTheme) => null,
};

const ColorThemeContext = React.createContext<ContextValueType>(defaultContext);

type ProviderProps = {
  initial?: ColorTheme;
};
/**
 * Provider for the site's colorTheme context.
 */
export const ColorThemeContextProvider: React.FC<ProviderProps> = ({
  initial = undefined,
  children,
}) => {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(initial);

  // on first render: reads the initial color theme from the root element and updates state accordingly
  useEffect(() => {
    const initialColorValue = window.document.documentElement.dataset.theme;
    if (initialColorValue === 'light' || initialColorValue === 'dark') {
      setColorTheme(initialColorValue);
    }
  }, []);

  /**
   * Handles updating the colorTheme: saves the colorTheme to localStorage, updates the colorTheme in state, and injects the colorTheme into the DOM.
   */
  const setTheme = (theme: ColorTheme) => {
    if (theme) {
      localStorage.setItem('colorTheme', theme);
      setColorTheme(theme);
      // inject the color theme into the DOM
      const root = document.documentElement;
      root.dataset.theme = theme;
      if (theme === 'light') {
        root.classList.add('light');
        root.classList.remove('dark');
      } else {
        root.classList.add('dark');
        root.classList.remove('light');
      }
    }
  };

  /**
   * Toggles the colorTheme.
   */
  const toggleColorTheme = (newTheme: ColorTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      // ensure that the passed color theme is correctly formatted
      setTheme(newTheme);
    } else {
      // if no colorTheme was passed, or the wrong value was passed, either toggle the theme in state, or fall back to 'light'
      colorTheme === 'light' ? setTheme('dark') : setTheme('light');
    }
  };

  return (
    <ColorThemeContext.Provider value={{ colorTheme, toggleColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

// colorTheme context custom hook
export const useColorThemeContext = () => {
  return useContext(ColorThemeContext);
};

/* ~~~ Injecting the initial color theme on page load ~~~ */

/**
 * Injects a colorTheme (either 'light' or 'dark') into the DOM by adding a 'light' or 'dark' class to the root element, and setting a data-theme to 'light' or 'dark'
 */
const injectTheme = (): void => {
  /**
   * Attempts to read the user's color theme preference from localStorage and the user's device settings.
   *
   * @return The user's preferred colorTheme, or undefined.
   */
  const getPreferredTheme = (): ColorTheme => {
    // attempt to read colorTheme from localStorage
    const persistedTheme = window.localStorage.getItem('colorTheme');
    if (persistedTheme === 'light' || persistedTheme === 'dark') {
      return persistedTheme;
    }
    // if no localStorage, attempt to read colorTheme from user's device settings
    const prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    // if user prefers a dark theme, return 'dark'
    if (prefersDarkQuery.matches) return 'dark';
    // if no preferred theme, return undefined
    return undefined;
  };

  const root = document.documentElement;
  // inject the preferred theme, or fall back to 'light'
  const colorTheme: ColorTheme = getPreferredTheme() || 'light';
  root.dataset.theme = colorTheme;
  console.log('Injecting theme', colorTheme);
  if (colorTheme === 'light') {
    root.classList.add('light');
    root.classList.remove('dark');
  } else {
    root.classList.add('dark');
    root.classList.remove('light');
  }
};

/**
 * Renders a `<script>` tag that will inject a colorTheme ('light' or 'dark') into the DOM on page load.
 *
 * Used to prevent the page from initially flashing a light theme before loading the user's preferred theme.
 */
export const InjectInitialTheme: React.FC = () => {
  // need to convert the function to a string, so it can be injected into the DOM.
  const stringifiedFunction = injectTheme.toString();

  // convert the function to an immediately invoked function expression, so it will run immediately in the browser
  const iife = `(${stringifiedFunction})()`;

  // inject script into DOM
  return <script dangerouslySetInnerHTML={{ __html: iife }} />;
};
