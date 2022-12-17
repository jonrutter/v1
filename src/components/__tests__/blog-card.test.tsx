import React from 'react';
import { render, screen } from 'test-utils';

import { BlogCard } from '../blog-card';
import { BlogPostPreview } from '@/types';

const item: BlogPostPreview = {
  id: '1',
  fields: {
    timeToRead: {
      text: '3 min read',
    },
  },
  frontmatter: {
    slug: 'test-project',
    date: '2022-06-01',
    excerpt: 'This is a test excerpt',
    title: 'Test Blog Post',
    featured_image: {
      childImageSharp: {
        gatsbyImageData: {
          layout: 'constrained',
          placeholder: {
            fallback: '',
          },
          backgroundColor: 'transparent',
          images: {
            fallback: {
              src: '',
              srcSet: '',
              sizes: '',
            },
            sources: [
              {
                srcSet: '',
                type: '',
                sizes: '',
              },
            ],
          },
          width: 650,
          height: 366,
        },
      },
    },
  },
};

const Component = <BlogCard item={item} />;

describe('Blog Card', () => {
  it('renders the component', () => {
    render(Component);
  });
  it('renders the correct content', () => {
    render(Component);
    // blog post excerpt
    screen.getByText(item.frontmatter.excerpt);

    // metadata
    screen.getByText('June 1, 2022');
    screen.getByText(/3 min read/i);

    // title link: should have inner text of the title, and href to the blog slug
    const titleLink = screen.getByText(item.frontmatter.title);
    expect(titleLink).toHaveAttribute('href', `/blog/${item.frontmatter.slug}`);

    // should display the featured image
    screen.getByAltText(/preview image for post/i);
  });
});
