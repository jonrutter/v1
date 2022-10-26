import React from 'react';
import { render, screen, waitFor } from 'test-utils';

// components
import { CodeTabs, CodePanel } from '../code-tabs';
import { CodeBlock } from '../code-block';
import userEvent from '@testing-library/user-event';

const CodeBlockOne = (
  <CodeBlock>
    <code className="language-javascript">
      console.log('Hello, JavaScript!');
    </code>
  </CodeBlock>
);

const CodeBlockTwo = (
  <CodeBlock>
    <code className="language-typescript">
      console.log('Hello, TypeScript!');
    </code>
  </CodeBlock>
);

const Component = (
  <CodeTabs one="JSX" two="TSX">
    <CodePanel>{CodeBlockOne}</CodePanel>
    <CodePanel>{CodeBlockTwo}</CodePanel>
  </CodeTabs>
);

const CustomComponent = (
  <CodeTabs one="markdown" two="bash">
    <CodePanel>{CodeBlockOne}</CodePanel>
    <CodePanel>{CodeBlockTwo}</CodePanel>
  </CodeTabs>
);

describe('CodeTabs', () => {
  it('renders the component', () => {
    render(Component);
  });
  it('correctly renders the tabs', () => {
    render(Component);
    const tabs = screen.getAllByRole('tab');
    // there should be two tabs
    expect(tabs).toHaveLength(2);
    const jsxButton = tabs[0];
    const tsxButton = tabs[1];
    // the tabs should be labeled 'JSX' and 'TSX' respectively
    expect(jsxButton).toHaveAccessibleName(/jsx/i);
    expect(tsxButton).toHaveAccessibleName(/tsx/i);
    // the tabs sould be accompanied by icons
    screen.getByTestId('code-tab-skill-JavaScript');
    screen.getByTestId('code-tab-skill-TypeScript');
  });
  it('renders tabs without icons', () => {
    // when tabs are not js/ts, should still render the tab names
    render(CustomComponent);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(2);
    const mdButton = tabs[0];
    const bashButton = tabs[1];
    expect(mdButton).toHaveAccessibleName(/markdown/i);
    expect(bashButton).toHaveAccessibleName(/bash/i);
  });
  it('only renders the active tab panel', async () => {
    render(Component);
    const tabs = screen.getAllByRole('tab');
    const tsxButton = tabs[1];

    expect(screen.getByText(/hello, javascript!/i)).toBeInTheDocument();
    expect(screen.queryByText(/hello, typescript!/i)).not.toBeInTheDocument();

    await userEvent.click(tsxButton);
    await waitFor(() => {
      expect(screen.getByText(/hello, typescript!/i)).toBeInTheDocument();
      expect(screen.queryByText(/hello, javascript!/i)).not.toBeInTheDocument();
    });
  });
});
