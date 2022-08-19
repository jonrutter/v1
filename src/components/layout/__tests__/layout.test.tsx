import React from 'react';
import { render, screen } from 'test-utils';

import { Layout } from '@/components/layout';
import { PageWrap } from '@/components/app';

const Component = (
  <PageWrap>
    <Layout>
      <h1>Hello, world!</h1>
    </Layout>
  </PageWrap>
);

describe('Layout', () => {
  it('renders the correct content', () => {
    render(Component);

    // page content should be rendered
    screen.getByText('Hello, world!');
  });
});
