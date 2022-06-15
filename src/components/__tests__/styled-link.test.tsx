import React from 'react';
import { render, screen } from 'test-utils';

import { StyledLink } from '../styled-link';

const Component = (
  <StyledLink to="/" className="">
    Home
  </StyledLink>
);

describe('StyledLink', () => {
  it('renders the component', () => {
    render(Component);
    screen.getByText(/home/i);
  });
});
