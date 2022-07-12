import React from 'react';
import { render, screen } from 'test-utils';
import renderer from 'react-test-renderer';

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
    // const tree = renderer.create(Component).toJSON();
    // expect(tree).toMatchSnapshot();
    render(Component);

    // page content should be rendered
    screen.getByText('Hello, world!');
  });
  it('matches the snapshot', () => {
    const tree = renderer.create(Component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
