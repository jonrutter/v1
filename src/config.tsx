/**
 * Configuration file for the site.
 *
 * Exports menu, socialLinks, and skills
 */

// types
import type { IconName } from './components/icon';

export type SocialLinkType = {
  name: string;
  icon: IconName;
  url: string;
};

export type MenuItem = {
  name: string;
  url: string;
};

export type Skill = {
  label: string;
  icon: IconName;
  href: string;
  color: string;
};

export type SkillGroup = {
  title: string;
  data: Skill[];
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

export const socialLinks: SocialLinkType[] = [
  {
    name: 'GitHub',
    icon: 'github',
    url: 'https://github.com/rutterjt',
  },
  {
    name: 'Twitter',
    icon: 'twitter',
    url: 'https://twitter.com/rutterjt',
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    url: 'https://www.linkedin.com/in/rutterjt/',
  },
  {
    name: 'Email Me',
    icon: 'email',
    url: 'mailto:contact@jonrutter.io',
  },
];

export const skills: SkillGroup[] = [
  {
    title: 'Languages',
    data: [
      {
        label: 'JavaScript',
        icon: 'javascript',
        href: 'https://developer.mozilla.org/en-US/docs/Glossary/JavaScript',
        color: '#F7DF1E',
      },
      {
        label: 'TypeScript',
        icon: 'typescript',
        href: 'https://www.typescriptlang.org/',
        color: '#3178C6',
      },
      {
        label: 'HTML',
        icon: 'html',
        href: 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5',
        color: '#E34F26',
      },
      {
        label: 'CSS',
        icon: 'css',
        href: 'https://developer.mozilla.org/en-US/docs/Glossary/CSS',
        color: '#1572B6',
      },
      {
        label: 'SCSS/Sass',
        icon: 'sass',
        href: 'https://sass-lang.com/',
        color: '#CC6699',
      },
    ],
  },
  {
    title: 'Libraries & Frameworks',
    data: [
      {
        label: 'React',
        icon: 'react',
        href: 'https://reactjs.org/',
        color: '#61DAFB',
      },
      {
        label: 'Gatsby',
        icon: 'gatsby',
        href: 'https://www.gatsbyjs.com/',
        color: '#663399',
      },
      {
        label: 'Tailwind CSS',
        icon: 'tailwind',
        href: 'https://tailwindcss.com/',
        color: '#38B2AC',
      },
      {
        label: 'Material UI',
        icon: 'materialui',
        href: 'https://mui.com/',
        color: '#0081CB',
      },
      {
        label: 'Redux',
        icon: 'redux',
        href: 'https://redux.js.org/',
        color: '#764ABC',
      },
    ],
  },
  {
    title: 'Tools & Platforms',
    data: [
      {
        label: 'Git',
        icon: 'git',
        href: 'https://developer.mozilla.org/en-US/docs/Glossary/Git',
        color: '#F05032',
      },
      {
        label: 'GitHub',
        icon: 'github',
        href: 'https://github.com/',
        color: '#181717',
      },
      {
        label: 'VS Code',
        icon: 'vscode',
        href: 'https://code.visualstudio.com/',
        color: '#007ACC',
      },
      {
        label: 'Netlify',
        icon: 'netlify',
        href: 'https://www.netlify.com/',
        color: '#00C7B7',
      },
      {
        label: 'Figma',
        icon: 'figma',
        href: 'https://www.figma.com/',
        color: '#F24E1E',
      },
      {
        label: 'Headless WordPress',
        icon: 'wordpress',
        href: 'https://wordpress.com/',
        color: '#21759B',
      },
    ],
  },
];
