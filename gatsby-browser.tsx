import React from 'react';
import type { GatsbyBrowser } from 'gatsby';

// page wrapper component
import { PageWrap } from '@/components';

// Google fonts
import '@fontsource/open-sans';
import '@fontsource/open-sans/600.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/900.css';

// reach tabs
import '@reach/tabs/styles.css';

// tailwind
import '@/styles/main.css';

// prism.js custom theme
import '@/styles/prism-custom-theme.css';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => {
  return <PageWrap>{element}</PageWrap>;
};
