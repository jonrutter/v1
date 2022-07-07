import React from 'react';
import clsx from 'clsx';
import { GatsbyImage } from 'gatsby-plugin-image';

// components
import { Icon, IconButton, StyledLink } from '@/components';

// types
import { SkillType, PortfolioItemType } from '@/types';

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
    <section className="grid grid-cols-12 grid-rows-3 md:grid-rows-1 w-full md:items-center">
      {/* preview image wrapper */}
      <div
        className={clsx(
          'row-start-1 row-end-3 md:row-span-full select-none pointer-events-none rounded-xl',
          reversed
            ? 'col-span-full md:col-start-6 md:col-end-13'
            : 'col-span-full md:col-start-1 md:col-end-8'
        )}
      >
        {image && (
          <GatsbyImage
            image={image}
            alt={`Picture of ${title}`}
            className="w-full h-full select-none pointer-events-none rounded-xl shadow-xl"
            imgClassName="w-full h-full object-cover select-none pointer-events-none"
          />
        )}
      </div>
      <div
        className={clsx(
          'row-start-2 row-end-4 md:row-span-full z-[5] bg-white/95 backdrop-blur dark:bg-slate-900/95 py-8 px-6 rounded-xl shadow-lg place-self-end md:place-self-auto',
          reversed
            ? 'col-start-1 col-end-11 md:col-start-1 md:col-end-10 lg:col-end-7'
            : 'col-start-3 col-end-13 md:col-start-4 md:col-end-13 lg:col-start-7'
        )}
      >
        <h3 className="mb-1 lg:mb-2 font-heading font-bold text-2xl text-slate-900 dark:text-slate-50">
          <StyledLink
            as="a"
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-block pb-2"
          >
            {title}
          </StyledLink>
        </h3>
        <p
          className="text-base mb-4"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {skills.length > 0 && (
          <ul className="text-sm hidden md:flex flex-wrap mb-4 ml-0 -mt-4">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-center ml-4 mt-4">
                <Skill skill={skill} />
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-end space-x-2 text-2xl">
          {code && (
            <IconButton
              as="a"
              href={code}
              aria-label="View project code"
              title="Project code"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="github" aria-hidden />
            </IconButton>
          )}
          {url && (
            <IconButton
              as="a"
              href={url}
              aria-label="View live site"
              title="Live site"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="external" aria-hidden />
            </IconButton>
          )}
        </div>
      </div>
    </section>
  );
};
