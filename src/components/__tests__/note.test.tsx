import React from 'react';
import { render, screen } from 'test-utils';

// component
import { Note, CodeNote } from '../note';

describe('Note component', () => {
  it('renders notes correctly', () => {
    render(<Note>Test Note</Note>);
    screen.getByText(/test note/i);
  });
  it('renders code notes correctly', () => {
    const href = '#';
    render(<CodeNote href={href} />);
    const link = screen.getByText(/code examples/i);
    expect(link).toHaveAttribute('href', href);
  });
});
