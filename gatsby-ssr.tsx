import React from 'react';
import type { GatsbySSR } from 'gatsby';

// Google fonts
import '@fontsource/open-sans';
import '@fontsource/open-sans/600.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/900.css';

// page wrapper component
import { PageWrap } from '@/components/app';

// light/dark theme
import { InjectInitialTheme } from '@/styles/useColorTheme';

// reach tabs styling
import '@reach/tabs/styles.css';

// tailwind
import '@/styles/main.css';

// prism.js custom theme
import '@/styles/prism-custom-theme.css';

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }) => {
  return <PageWrap>{element}</PageWrap>;
};

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setPreBodyComponents,
}) => {
  setPreBodyComponents([<InjectInitialTheme key="inject-initial-theme" />]);
};
