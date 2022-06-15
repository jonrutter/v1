import React from 'react';
import { render, screen } from 'test-utils';

import { AutoLinkH2, AutoLinkH3 } from '../header-links';

const TestH2 = <AutoLinkH2>Test Heading Two</AutoLinkH2>;
const TestH3 = <AutoLinkH3>Test Heading Three</AutoLinkH3>;

describe('AutoLinkH2', () => {
  it('renders the component', () => {
    render(TestH2);
    screen.getByText(/test heading two/i);
  });
  it('has the correct id', () => {
    render(TestH2);
    const heading = screen.getByText(/test heading two/i);
    expect(heading).toHaveAttribute('id', 'test-heading-two');
  });
  it('correctly renders the link', () => {
    render(TestH2);
    const link = screen.getByLabelText(/link to heading/i);
    expect(link).toHaveAttribute('href', `#test-heading-two`);
  });
});

describe('AutoLinkH3', () => {
  it('renders the component', () => {
    render(TestH3);
    screen.getByText(/test heading three/i);
  });
  it('has the correct id', () => {
    render(TestH3);
    const heading = screen.getByText(/test heading three/i);
    expect(heading).toHaveAttribute('id', 'test-heading-three');
  });
  it('correctly renders the link', () => {
    render(TestH3);
    const link = screen.getByLabelText(/link to heading/i);
    expect(link).toHaveAttribute('href', `#test-heading-three`);
  });
});
