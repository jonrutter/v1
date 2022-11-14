import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';

// types
import type { BlogPostPreview } from '@/types';

// components
import { StyledLink } from './styled-link';

type Props = {
  item: BlogPostPreview;
};

export const BlogCard: React.FC<Props> = ({ item }) => {
  return (
    <article className="shadow-lg rounded-xl overflow-hidden bg-white dark:bg-slate-700 flex flex-col md:flex-row lg:flex-col w-full max-w-[325px] md:max-w-full lg:max-w-[325px] mx-auto text-slate-600 dark:text-slate-200 isolate">
      {/* image wrap */}
      {item.frontmatter.featured_image && (
        <div className="md:flex-[3] lg:flex-auto overflow-hidden">
          <GatsbyImage
            alt={`Preview image for post ${item.frontmatter.title}`}
            image={
              item.frontmatter.featured_image.childImageSharp.gatsbyImageData
            }
            className="max-w-[325px] md:h-full md:object-cover lg:h-auto lg:object-none pointer-events-none select-none"
          />
        </div>
      )}
      {/* content wrap */}
      <div className="max-w-prose p-8 lg:p-6 md:flex-[5] lg:flex-auto">
        <header>
          <h3 className="font-heading font-bold mb-1 text-2xl text-slate-900 dark:text-white">
            <StyledLink to={`/blog/${item.slug}`} className="inline-block">
              {item.frontmatter.title}
            </StyledLink>
          </h3>
          <small className="block mb-4 text-slate-500 dark:text-slate-300">
            <time dateTime={item.frontmatter.date}>
              {format(parseISO(item.frontmatter.date), 'MMMM d, yyyy')}
            </time>{' '}
            • {item.timeToRead} minute read
          </small>
        </header>
        <div>
          <p className="mb-2">{item.frontmatter.excerpt}</p>
        </div>
      </div>
    </article>
  );
};
