import React from 'react';
import { render, screen } from 'test-utils';

// component
import { Note } from '../note';

const Component = <Note>Test Note</Note>;

describe('Note component', () => {
  it('renders the correct content', () => {
    render(Component);
    screen.getByText(/test note/i);
  });
});
