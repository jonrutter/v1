import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import clsx from 'clsx';

// types
import { PortfolioItemType, BlogPostPreview } from '../types';

// components
import { H3, P } from './typography';
import { Icon } from './icon';
import { SkillType } from '../../content/portfolio/portfolioItems';
import { StyledLink } from './styled-link';

/* ~~~ Card Base ~~~ */

type CardProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
};

/**
 * Renders a polymorphic, styled card component.
 */
export const Card = <T extends React.ElementType = 'div'>({
  as,
  className = '',
  children,
}: CardProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof CardProps<T>>) => {
  const Tag = as || 'div';
  return (
    <Tag
      className={clsx(
        'py-6 px-8 sm:py-8 sm:px-12 bg-white dark:bg-slate-900 rounded-4xl shadow-xl transition-all',
        className
      )}
    >
      {children}
    </Tag>
  );
};

/* ~~~ PortfolioCard ~~~ */

type PCardProps = {
  item: PortfolioItemType;
  reversed?: boolean;
};

const Skill = ({ skill }: { skill: SkillType }) => (
  <div style={{ color: skill.color }} className="flex items-center">
    {skill.icon && <Icon name={skill.icon} className="mr-1 dark:text-white" />}
    <span className="text-slate-700 dark:text-slate-200">{skill.label}</span>
  </div>
);

export const PortfolioCard: React.FC<PCardProps> = ({ item, reversed }) => {
  // destructure portfolio item properties
  const { title, description, url, code, skills } = item;
  const image = item.featuredImage?.src.childImageSharp.gatsbyImageData;

  return (
    <section className="grid grid-cols-12 grid-rows-1 w-full md:items-center">
      {/* preview image wrapper */}
      <div
        className={clsx(
          'col-span-full row-span-full select-none pointer-events-none rounded-4xl',
          reversed
            ? 'md:col-start-6 md:col-end-13'
            : 'md:col-start-1 md:col-end-8'
        )}
      >
        {image && (
          <GatsbyImage
            image={image}
            alt={`Picture of ${title}`}
            className="select-none pointer-events-none rounded-4xl shadow-xl"
            imgClassName="select-none pointer-events-none"
          />
        )}
      </div>
      <div
        className={clsx(
          'row-span-full z-[5] bg-white/95 backdrop-blur dark:bg-slate-900/95 py-8 px-6 rounded-4xl shadow-lg place-self-end md:place-self-auto',
          reversed
            ? 'col-start-1 col-end-12 md:col-start-1 md:col-end-10 lg:col-end-7'
            : 'col-start-2 col-end-13 md:col-start-6 md:col-end-13 lg:col-start-7'
        )}
      >
        <H3 className="mb-4 md:mb-5">
          <StyledLink
            as="a"
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-block py-1 px-2 -ml-2 hover:text-sea-600 dark:hover:text-sea-400"
          >
            {title}
          </StyledLink>
        </H3>
        <div
          className="text-base mb-4"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {skills.length > 0 && (
          <ul className="text-sm flex flex-wrap mb-4 ml-0 -mt-4">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-center ml-4 mt-4">
                <Skill skill={skill} />
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-end space-x-8 text-2xl">
          {code && (
            <a
              href={code}
              title="Project code"
              aria-label="Project code"
              className="transition-all outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-50 p-1 rounded-md hover:text-sea-600 dark:hover:text-sea-400"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="github" aria-hidden />
            </a>
          )}
          {url && (
            <a
              href={url}
              title="Live site"
              aria-label="Live site"
              className="transition-all outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-50 p-1 rounded-md hover:text-sea-600 dark:hover:text-sea-400"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="external" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

/* ~~~ Blog Excerpt Card ~~~ */

type BlogProps = {
  item: BlogPostPreview;
};

export const BlogCard: React.FC<BlogProps> = ({ item }) => {
  return (
    <article className="shadow-lg rounded-2xl overflow-hidden bg-white dark:bg-slate-900 flex flex-col md:flex-row lg:flex-col w-full max-w-[325px] md:max-w-full lg:max-w-[325px] mx-auto">
      {/* image wrap */}
      {item.frontmatter.featured_image && (
        <div>
          <GatsbyImage
            alt={`Preview image for post ${item.frontmatter.title}`}
            image={
              item.frontmatter.featured_image.childImageSharp.gatsbyImageData
            }
            className="max-w-[325px] rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none lg:rounded-t-2xl lg:rounded-bl-none"
          />
        </div>
      )}
      {/* content wrap */}
      <div className="max-w-prose p-8 lg:p-6">
        <header>
          <H3 className="mb-3">
            <StyledLink
              to={`/blog/${item.slug}`}
              className="py-1 px-2 -ml-2 rounded-md hover:text-sea-600 dark:hover:text-sea-400"
            >
              {item.frontmatter.title}
            </StyledLink>
          </H3>
          <small className="block mb-4 text-slate-600 dark:text-slate-300">
            {item.frontmatter.date} • {item.timeToRead} minute read
          </small>
        </header>
        <div>
          <P>{item.frontmatter.excerpt}</P>
        </div>
      </div>
    </article>
  );
};
