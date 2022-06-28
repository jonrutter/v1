import React from 'react';
import { render, screen } from 'test-utils';

// component
import { Footer } from '../footer';

import { menu, socialLinks } from '@/config';

// jest.mock('../../images/site-logo.svg', () => 'dummy/path/site-logo.svg');

describe('Footer', () => {
  it('renders the entire menu', () => {
    render(<Footer />);

    // all menu links should display
    menu.forEach((item) => {
      let results = screen.getAllByText(item.name);
      expect(results).not.toHaveLength(0);
    });

    // there should be a link for each item in socialLinks
    socialLinks.forEach((link) => {
      screen.getByLabelText(link.name);
    });
  });
});
