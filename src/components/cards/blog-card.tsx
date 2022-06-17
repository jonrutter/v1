import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';

// types
import type { BlogPostPreview } from '@/types';

type Props = {
  item: BlogPostPreview;
};

export const BlogCard: React.FC<Props> = ({ item }) => {
  return (
    <article className="shadow-lg rounded-xl overflow-hidden bg-white dark:bg-slate-900 flex flex-col md:flex-row lg:flex-col w-full max-w-[325px] md:max-w-full lg:max-w-[325px] mx-auto">
      {/* image wrap */}
      {item.frontmatter.featured_image && (
        <div className="md:flex-[3] lg:flex-auto">
          <GatsbyImage
            alt={`Preview image for post ${item.frontmatter.title}`}
            image={
              item.frontmatter.featured_image.childImageSharp.gatsbyImageData
            }
            className="max-w-[325px] rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none md:h-full md:object-cover lg:h-auto lg:object-none lg:rounded-t-2xl lg:rounded-bl-none pointer-events-none select-none"
          />
        </div>
      )}
      {/* content wrap */}
      <div className="max-w-prose p-8 lg:p-6 md:flex-[5] lg:flex-auto">
        <header>
          <h3 className="font-heading font-bold mb-3 text-2xl text-slate-900 dark:text-slate-50">
            <Link
              to={`/blog/${item.slug}`}
              className="py-1 px-2 -ml-2 rounded-md hover:text-sea-600 dark:hover:text-sea-400 inline-block transition-all outline-none focus:ring-2 focus:ring-current"
            >
              {item.frontmatter.title}
            </Link>
          </h3>
          <small className="block mb-4 text-slate-600 dark:text-slate-300">
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
