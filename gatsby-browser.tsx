import React from 'react';
import { PageWrap } from './src/components/app';
import type { GatsbyBrowser } from 'gatsby';

// Google fonts
import '@fontsource/open-sans';
import '@fontsource/open-sans/600.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/900.css';

// tailwind
import './src/styles/main.css';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => {
  return <PageWrap>{element}</PageWrap>;
};
