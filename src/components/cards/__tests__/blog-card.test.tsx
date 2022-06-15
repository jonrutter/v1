import React from 'react';
import { render, screen } from 'test-utils';

import { BlogCard } from '../blog-card';
import { BlogPostPreview } from '@/types';

const item: BlogPostPreview = {
  slug: 'test-slug/',
  id: '1',
  timeToRead: 3,
  frontmatter: {
    date: 'June 1, 2022',
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
    screen.getByText(
      `${item.frontmatter.date} • ${item.timeToRead} minute read`
    );

    // title link: should have inner text of the title, and href to the blog slug
    const titleLink = screen.getByText(item.frontmatter.title);
    expect(titleLink).toHaveAttribute('href', `/blog/${item.slug}`);

    // should display the featured image
    screen.getByAltText(/preview image for post/i);
  });
});
