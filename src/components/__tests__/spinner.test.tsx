import React from 'react';
import { render, screen } from 'test-utils';

import { Spinner } from '../spinner';

describe('Spinner', () => {
  it('renders the componenent', () => {
    render(<Spinner />);
  });
});
