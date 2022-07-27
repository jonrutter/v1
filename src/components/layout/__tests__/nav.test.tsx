import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';

import { Nav } from '../nav';

import { menu } from '@/config';

const Component = <Nav />;

describe('Header', () => {
  it('renders the component correctly', () => {
    render(Component);
  });
  it('renders the correct content', () => {
    render(Component);
    // it should render the logo
    screen.getByLabelText('Jon Rutter');

    // it should render all of the nav links
    menu.forEach((item) => {
      let results = screen.getAllByText(item.name);
      expect(results).not.toHaveLength(0);
    });
  });
  it('supports toggling the nav drawer', async () => {
    render(Component);
    let button = screen.getByLabelText(/(open|close) navigation menu/i);

    // nav drawer and contents should be hidden initially
    expect(screen.queryByTestId('nav-drawer')).not.toBeInTheDocument();

    await userEvent.click(button);

    await waitFor(() => {
      // after clicking toggle button, nav drawer and contents should be visible and focusable
      expect(screen.getByTestId('nav-drawer')).toBeInTheDocument();
    });

    // pressing the escape key should close the drawer
    await userEvent.keyboard('{Escape}');
    // nav drawer should close
    await waitFor(() => {
      expect(screen.queryByTestId('nav-drawer')).not.toBeInTheDocument();
    });
  });
});
