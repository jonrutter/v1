import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';

import { Header } from '../header';

import { menu, socialLinks } from '@/config';

const Component = <Header />;

describe('Header', () => {
  it('renders the component correctly', () => {
    render(Component);
  });
  it('renders the correct content', () => {
    render(Component);
    // it should render the logo
    screen.getAllByAltText('Jon Rutter');

    // it should render all of the nav links
    menu.forEach((item) => {
      let results = screen.getAllByText(item.name);
      expect(results).not.toHaveLength(0);
    });
  });
  it('supports toggling the nav drawer', async () => {
    render(Component);
    let button = screen.getByLabelText(/toggle navigation menu/i);
    let navDrawer = screen.getByTestId('nav-drawer');
    let socialLink = screen.getByLabelText(/my github/i);

    // nav drawer and contents should be hidden initially
    expect(navDrawer).toHaveAttribute('aria-hidden', 'true');
    expect(socialLink).toHaveAttribute('tabindex', '-1');

    await userEvent.click(button);

    await waitFor(() => {
      // after clicking toggle button, nav drawer and contents should be visible and focusable
      expect(navDrawer).toHaveAttribute('aria-hidden', 'false');
      expect(socialLink).toHaveAttribute('tabindex', '0');
    });

    // clicking the toggle button should close the nav drawer again
    await userEvent.click(button);
    await waitFor(() => {
      expect(navDrawer).toHaveAttribute('aria-hidden', 'true');
      expect(socialLink).toHaveAttribute('tabindex', '-1');
    });

    // pressing the Escape key should close the nav drawer when open
    // open the nav drawer again
    await userEvent.click(button);
    await waitFor(() => {
      expect(navDrawer).toHaveAttribute('aria-hidden', 'false');
    });
    // press Escape key
    await userEvent.keyboard('{Escape}');
    // nav drawer should close
    await waitFor(() => {
      expect(navDrawer).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
