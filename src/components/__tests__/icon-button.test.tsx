import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';

import { IconButton } from '../buttons';
import { Icon } from '../icon';

const handler = jest.fn(() => null);

const PBasLink = (
  <IconButton to="/" aria-label="github">
    <Icon name="github" data-testid="" />
  </IconButton>
);
const PBasAnchor = (
  <IconButton
    as="a"
    href="https://www.jonrutter.io"
    target="_blank"
    rel="noreferrer"
    aria-label="github"
  >
    <Icon name="github" />
  </IconButton>
);
const PBasButton = (
  <IconButton as="button" type="button" onClick={handler} aria-label="github">
    <Icon name="github" />
  </IconButton>
);

describe('IconButton', () => {
  it('renders a GatsbyLink by default', () => {
    render(PBasLink);
    const link = screen.getByLabelText(/github/i);
    expect(link).toHaveAttribute('href', '/');
  });
  it('can render as an anchor tag', () => {
    render(PBasAnchor);
    const link = screen.getByLabelText(/github/i);
    expect(link).toHaveAttribute('href', 'https://www.jonrutter.io');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
  it('can render as a button', () => {
    render(PBasButton);
    const button = screen.getByLabelText(/github/i);
    expect(button).toHaveAttribute('type', 'button');
  });
  it('can be clicked as a button', async () => {
    render(PBasButton);
    const button = screen.getByLabelText(/github/i);
    await userEvent.click(button);
    await waitFor(() => {
      expect(handler).toBeCalledTimes(1);
    });
  });
});
