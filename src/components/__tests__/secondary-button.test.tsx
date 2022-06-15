import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';

import { SecondaryButton } from '../buttons';

const handler = jest.fn(() => null);

const PBasLink = <SecondaryButton to="/">Home</SecondaryButton>;
const PBasAnchor = (
  <SecondaryButton
    as="a"
    href="https://www.jonrutter.io"
    target="_blank"
    rel="noreferrer"
  >
    External
  </SecondaryButton>
);
const PBasButton = (
  <SecondaryButton as="button" type="button" onClick={handler}>
    Button
  </SecondaryButton>
);

describe('SecondaryButton', () => {
  it('renders a GatsbyLink by default', () => {
    render(PBasLink);
    const link = screen.getByText(/home/i);
    expect(link).toHaveAttribute('href', '/');
  });
  it('can render as an anchor tag', () => {
    render(PBasAnchor);
    const link = screen.getByText(/external/i);
    expect(link).toHaveAttribute('href', 'https://www.jonrutter.io');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
  it('can render as a button', () => {
    render(PBasButton);
    const button = screen.getByText(/button/i);
    expect(button).toHaveAttribute('type', 'button');
  });
  it('can be clicked as a button', async () => {
    render(PBasButton);
    const button = screen.getByText(/button/i);
    await userEvent.click(button);
    await waitFor(() => {
      expect(handler).toBeCalledTimes(1);
    });
  });
});
