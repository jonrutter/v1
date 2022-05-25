/**
 * Configuration file for the site.
 *
 * Exports menu, socialLinks, and skills
 */

// types
import type { IconName } from '@/components/icon';
import type { SkillType } from '@/types';

import * as Skill from '@content/portfolio/skills';

export type SocialLinkType = {
  name: string;
  icon: IconName;
  url: string;
};

export type MenuItem = {
  name: string;
  url: string;
};

export type SkillGroup = {
  label: string;
  list: SkillType[];
};

// config
export const menu: MenuItem[] = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Portfolio',
    url: '/portfolio',
  },
  {
    name: 'Blog',
    url: '/blog',
  },
  {
    name: 'Contact',
    url: '/contact',
  },
];

export const links = {
  github: 'https://github.com/rutterjt',
  twitter: 'https://twitter.com/rutterjt',
  linkedin: 'https://www.linkedin.com/in/rutterjt/',
  email: 'mailto:contact@jonrutter.io',
};

export const socialLinks: SocialLinkType[] = [
  {
    name: 'GitHub',
    icon: 'github',
    url: links.github,
  },
  {
    name: 'Twitter',
    icon: 'twitter',
    url: links.twitter,
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    url: links.linkedin,
  },
  {
    name: 'Email Me',
    icon: 'email',
    url: links.email,
  },
];

export const skills: SkillGroup[] = [
  {
    label: 'Languages',
    list: [
      Skill.JavaScript,
      Skill.TypeScript,
      Skill.HTML,
      Skill.CSS,
      Skill.Sass,
    ],
  },
  {
    label: 'Libraries & Frameworks',
    list: [
      Skill.React,
      Skill.Gatsby,
      Skill.Tailwind,
      Skill.MaterialUI,
      Skill.Redux,
    ],
  },
  {
    label: 'Tools & Platforms',
    list: [
      Skill.Git,
      Skill.GitHub,
      Skill.VSCode,
      Skill.Netlify,
      Skill.Figma,
      Skill.WordPress,
    ],
  },
];
