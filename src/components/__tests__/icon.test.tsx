import React from 'react';
import { render, screen } from 'test-utils';

// component
import { Icon } from '../icon';

const Component = <Icon name="gatsby" data-testid="test-svg" color="red" />;

describe('Icon component', () => {
  it('renders the component correctly', () => {
    render(Component);
    const icon = screen.getByTestId('test-svg');
    expect(icon).toBeInTheDocument();
  });
  it('should pass props to underlying component', () => {
    render(Component);
    const icon = screen.getByTestId('test-svg');
    expect(icon).toHaveAttribute('color', 'red');
  });
});
