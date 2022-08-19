import React from 'react';
import { screen, render } from 'test-utils';

import { Section } from '../section';

const Component = <Section>Hello, world!</Section>;

describe('Section layout component', () => {
  it('renders the correct content', () => {
    render(Component);
    screen.getByText('Hello, world!');
  });
});
