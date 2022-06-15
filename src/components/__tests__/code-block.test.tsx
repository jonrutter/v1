import React from 'react';
import { render, screen } from 'test-utils';

// components
import { CodeBlock } from '../code-block';

const Component = (
  <CodeBlock>
    <code className="language-javascript">
      console.log('Hello, JavaScript!');
    </code>
  </CodeBlock>
);

describe('CodeBlock', () => {
  it('renders the correct content', () => {
    render(Component);
    screen.getByText(/hello, javascript!/i);
  });
  it('parses the correct language', () => {
    render(Component);
    const codeBlock = screen.getByTestId('code-block');
    expect(codeBlock).toHaveAttribute('data-language', 'javascript');
  });
  it('displays line numbers', () => {
    render(Component);
    const lineWrapper = screen.getByTestId('code-block-line');
    expect(lineWrapper).toHaveAttribute('data-line', '1');
  });
});
