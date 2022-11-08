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

const BlogComponent = (
  <PageWrap>
    <Layout blogPost>
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
  it('renders correctly as a blog post', () => {
    render(BlogComponent);

    // page content should be rendered
    screen.getByText('Hello, world!');
  });
});
