import React from 'react';
import { render, screen } from 'test-utils';

import { AutoLinkH2 as H2, AutoLinkH3 as H3 } from '../autolink-headings';

const TestH2 = <H2>Test Heading Two</H2>;
const TestH3 = <H3>Test Heading Three</H3>;

const code = (
  <>
    Test <code>`useTitle`</code> With Code
  </>
);

const specialChars = <>Title "With " Special \ Chars</>;

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
  it('correctly renders embedded text', () => {
    render(<H2>{code}</H2>);
    let heading = screen.getByTestId('test-usetitle-with-code');
    expect(heading).toHaveProperty('id', 'test-usetitle-with-code');
    const link = screen.getByLabelText(/link to heading/i);
    expect(link).toHaveAttribute('href', `#test-usetitle-with-code`);
  });
  it('correctly removes special characters', () => {
    render(<H2>{specialChars}</H2>);
    let heading = screen.getByTestId('title-with-special-chars');
    expect(heading).toHaveProperty('id', 'title-with-special-chars');
    const link = screen.getByLabelText(/link to heading/i);
    expect(link).toHaveAttribute('href', `#title-with-special-chars`);
  });
  it('correctly formats titles with numbers', () => {
    render(<H2>Top 10 projects</H2>);
    let heading = screen.getByTestId('top-10-projects');
    expect(heading).toHaveProperty('id', 'top-10-projects');
    const link = screen.getByLabelText(/link to heading/i);
    expect(link).toHaveAttribute('href', `#top-10-projects`);
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
  it('correctly renders embedded text', () => {
    render(<H3>{code}</H3>);
    let heading = screen.getByTestId('test-usetitle-with-code');
    expect(heading).toHaveProperty('id', 'test-usetitle-with-code');
    const link = screen.getByLabelText(/link to heading/i);
    expect(link).toHaveAttribute('href', `#test-usetitle-with-code`);
  });
  it('correctly removes special characters', () => {
    render(<H3>{specialChars}</H3>);
    let heading = screen.getByTestId('title-with-special-chars');
    expect(heading).toHaveProperty('id', 'title-with-special-chars');
    const link = screen.getByLabelText(/link to heading/i);
    expect(link).toHaveAttribute('href', `#title-with-special-chars`);
  });
  it('correctly formats titles with numbers', () => {
    render(<H3>Top 10 projects</H3>);
    let heading = screen.getByTestId('top-10-projects');
    expect(heading).toHaveProperty('id', 'top-10-projects');
    const link = screen.getByLabelText(/link to heading/i);
    expect(link).toHaveAttribute('href', `#top-10-projects`);
  });
});
