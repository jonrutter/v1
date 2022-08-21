// @ts-nocheck
import React from 'react';
import { render, screen } from 'test-utils';

// components
import { CodeBlock } from '../code-block';

const Component = (
  <CodeBlock>
    <code
      className="language-javascript"
      filename="src/components/test-component.js"
    >
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
  it('defaults to markdown if no language is specified', () => {
    render(
      <CodeBlock>
        <code>console.log('Hello, JavaScript!');</code>
      </CodeBlock>
    );
    const codeBlock = screen.getByTestId('code-block');
    expect(codeBlock).toHaveAttribute('data-language', 'markdown');
  });
  it('correctly displays line numbers', () => {
    render(Component);
    const lineWrapper = screen.getByTestId('code-block-line');
    expect(lineWrapper).toHaveAttribute('data-line', '1');
  });
  it('correctly displays the file name, if present', () => {
    render(Component);
    screen.getByText('src/components/test-component.js');
  });
});
