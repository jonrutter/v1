import { IGatsbyImageData } from 'gatsby-plugin-image';

import {
  PortfolioItemType,
  SkillType,
} from '@content/portfolio/portfolioItems';

export type { PortfolioItemType, SkillType };

export type PostNode = {
  frontmatter: {
    slug: string;
    title: string;
  };
};

export type BlogPostPreview = {
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    slug: string;
    featured_image?: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
    topics?: string[] | null;
  };
  fields: {
    timeToRead: {
      text: string;
    };
  };
  id: string;
};

export type BlogNode = {
  id: string;
  body: string;
  fields: {
    timeToRead: {
      text: string;
    };
  };
  frontmatter: {
    date: string;
    excerpt: string;
    slug: string;
    title: string;
    topics: string[];
    featured_image_alt?: string;
    featured_image_credit?: string;
    featured_image_link?: string;
    featured_image?: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
        original: {
          src: string;
          width: number;
          height: number;
        };
      };
    };
  };
};
