import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';

import { PrimaryButton } from '../buttons';

const handler = jest.fn(() => null);

const PBasLink = <PrimaryButton to="/">Home</PrimaryButton>;
const PBasAnchor = (
  <PrimaryButton
    as="a"
    href="https://www.jonrutter.io"
    target="_blank"
    rel="noreferrer"
  >
    External
  </PrimaryButton>
);
const PBasButton = (
  <PrimaryButton as="button" type="button" onClick={handler}>
    Button
  </PrimaryButton>
);

describe('PrimaryButton', () => {
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
