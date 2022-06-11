import { IGatsbyImageData } from 'gatsby-plugin-image';

import {
  PortfolioItemType,
  SkillType,
} from '@content/portfolio/portfolioItems';

export type { PortfolioItemType, SkillType };

export type PostNode = {
  childMdx: {
    slug: string;
    frontmatter: {
      title: string;
    };
  };
};

export type BlogPostPreview = {
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    featured_image?: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };
  slug: string;
  timeToRead: number;
  id: string;
};

export type BlogPost = {
  childMdx: {
    id: string;
    slug: string;
    timeToRead: number;
    body: string;
    frontmatter: {
      excerpt: string;
      date: string;
      title: string;
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
};
