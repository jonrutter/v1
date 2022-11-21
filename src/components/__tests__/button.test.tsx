import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';

import { Button } from '../buttons';

const handler = jest.fn(() => null);

const ButtonAsLink = <Button to="/">Home</Button>;

const ButtonAsAnchor = (
  <Button
    as="a"
    href="https://www.jonrutter.io"
    target="_blank"
    rel="noreferrer"
  >
    External
  </Button>
);

const ButtonAsButton = (
  <Button as="button" type="button" onClick={handler}>
    Button
  </Button>
);

describe('Button', () => {
  it('renders a GatsbyLink by default', () => {
    render(ButtonAsLink);
    const link = screen.getByText(/home/i);
    expect(link).toHaveAttribute('href', '/');
  });
  it('can render as an anchor tag', () => {
    render(ButtonAsAnchor);
    const link = screen.getByText(/external/i);
    expect(link).toHaveAttribute('href', 'https://www.jonrutter.io');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
  it('can render as a button', () => {
    render(ButtonAsButton);
    const button = screen.getByText(/button/i);
    expect(button).toHaveAttribute('type', 'button');
  });
  it('can be clicked as a button', async () => {
    render(ButtonAsButton);
    const button = screen.getByText(/button/i);
    await userEvent.click(button);
    await waitFor(() => {
      expect(handler).toBeCalledTimes(1);
    });
  });
  it('renders successfully with a variant', () => {
    render(
      <Button as="button" variant="secondary">
        Secondary
      </Button>
    );
    screen.getByText(/secondary/i);
  });
});
