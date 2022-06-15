import React from 'react';
import renderer from 'react-test-renderer';

import { CTABox, HomeHero, PortfolioHero } from '@/components/sections';

describe('CTA Box', () => {
  it('renders the correct content', () => {
    const tree = renderer.create(<CTABox />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Home Hero', () => {
  it('renders the correct content', () => {
    const tree = renderer.create(<HomeHero />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Portfolio Hero', () => {
  it('renders the correct content', () => {
    const tree = renderer.create(<PortfolioHero />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
