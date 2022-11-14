import React from 'react';
import clsx from 'clsx';
import { GatsbyImage } from 'gatsby-plugin-image';

// components
import { Icon, IconButton, StyledLink } from '@/components';
import { Chip } from './chips';

// types
import { SkillType, PortfolioItemType } from '@/types';

/* ~~~ PortfolioCard ~~~ */

type PCardProps = {
  item: PortfolioItemType;
  reversed?: boolean;
};

const Skill = ({ skill }: { skill: SkillType }) => (
  <div style={{ color: skill.color }} className="flex items-center">
    {skill.icon && (
      <Icon name={skill.icon} className="mr-2 dark:text-slate-200" />
    )}
    <span className="text-slate-600 dark:text-slate-200 leading-none">
      {skill.label}
    </span>
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
          'row-start-1 row-end-3 md:row-span-full select-none pointer-events-none',
          reversed
            ? 'col-span-full md:col-start-6 md:col-end-13'
            : 'col-span-full md:col-start-1 md:col-end-8'
        )}
      >
        {image && (
          <GatsbyImage
            image={image}
            alt={`Picture of ${title}`}
            className="w-full h-full select-none pointer-events-none shadow-xl rounded-xl overflow-hidden isolate"
            imgClassName="w-full h-full object-cover select-none pointer-events-none"
          />
        )}
      </div>
      <div
        className={clsx(
          'row-start-2 row-end-4 md:row-span-full z-[5] bg-white/95 backdrop-blur dark:bg-slate-700/95 text-slate-600 dark:text-slate-200 py-8 px-6 rounded-xl shadow-lg place-self-end md:place-self-auto',
          reversed
            ? 'col-start-1 col-end-11 md:col-start-1 md:col-end-10 lg:col-end-7'
            : 'col-start-3 col-end-13 md:col-start-4 md:col-end-13 lg:col-start-7'
        )}
      >
        <h3 className="mb-1 lg:mb-2 font-heading font-bold text-2xl text-slate-900 dark:text-white">
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
                {skill.href ? (
                  <Chip
                    color={skill.color}
                    as="a"
                    href={skill.href}
                    target="_blank"
                    rel="noreferrer"
                    data-testid={`chip-${skill.label}`}
                  >
                    <Skill skill={skill} />
                  </Chip>
                ) : (
                  <Chip color={skill.color}>
                    <Skill skill={skill} />
                  </Chip>
                )}
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
