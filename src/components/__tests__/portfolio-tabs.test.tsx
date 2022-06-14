import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';

// components
import { PortfolioTabs, PortfolioTabPanel } from '../portfolio-tabs';

const Component = (
  <PortfolioTabs>
    <PortfolioTabPanel>Website Cards</PortfolioTabPanel>
    <PortfolioTabPanel>App Cards</PortfolioTabPanel>
  </PortfolioTabs>
);

describe('PortfolioTabs component', () => {
  it('renders the component', () => {
    render(Component);
  });
  it('supports toggling through tabs', async () => {
    render(Component);
    const websiteTab = screen.getByText(/websites/i);
    const appsTab = screen.getByText(/apps/i);

    const wpContent = screen.getByText(/website cards/i);
    const apContent = screen.getByText(/app cards/i);

    // by default, the website panel should be open
    expect(wpContent).toBeVisible();
    expect(apContent).not.toBeVisible();

    await userEvent.click(appsTab);

    await waitFor(() => {
      expect(wpContent).not.toBeVisible();
      expect(apContent).toBeVisible();
    });
  });
});
