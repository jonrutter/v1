import React from 'react';
import { render, screen } from 'test-utils';
import renderer from 'react-test-renderer';

import { Hero } from '../hero';

const Component: React.FC<{ short?: boolean }> = ({ short = false }) => (
  <Hero title="Test Title" short={short}>
    <p>This is a test Hero component.</p>
  </Hero>
);

describe('Hero component', () => {
  it('renders the correct content', () => {
    render(<Component />);
    screen.getByText('Test Title');
    screen.getByText('This is a test Hero component.');
  });
  it('matches the snapshot', () => {
    const tree = renderer.create(<Component />);
    expect(tree).toMatchSnapshot();
  });
  it('matches the snapshot when short', () => {
    const tree = renderer.create(<Component short />);
    expect(tree).toMatchSnapshot();
  });
});
