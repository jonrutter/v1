import React from 'react';
import renderer from 'react-test-renderer';

import { Section } from '../section';

const Component = <Section>Hello, world!</Section>;

describe('Section layout component', () => {
  it('renders the correct content', () => {
    const tree = renderer.create(Component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
