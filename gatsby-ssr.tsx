import React from 'react';
import { PageWrap } from './src/components/app';
import { InjectInitialTheme } from './src/styles/useColorTheme';

import type { GatsbySSR } from 'gatsby';

// Google fonts
import '@fontsource/open-sans';
import '@fontsource/open-sans/600.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/900.css';

// tailwind
import './src/styles/global.css';

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }) => {
  return <PageWrap>{element}</PageWrap>;
};

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setPreBodyComponents,
}) => {
  setPreBodyComponents([<InjectInitialTheme />]);
};
