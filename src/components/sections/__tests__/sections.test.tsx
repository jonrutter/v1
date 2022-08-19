import React from 'react';
import { render } from 'test-utils';

import { CTABox, HomeHero, PortfolioHero } from '@/components/sections';

describe('CTA Box', () => {
  it('renders correctly', () => {
    render(<CTABox />);
  });
});

describe('Home Hero', () => {
  it('renders correctly', () => {
    render(<HomeHero />);
  });
});

describe('Portfolio Hero', () => {
  it('renders correctly', () => {
    render(<PortfolioHero />);
  });
});
