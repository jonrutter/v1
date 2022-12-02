// types
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { IconName } from '../../src/components/icon';

// skills
import {
  React,
  Gatsby,
  JavaScript,
  TypeScript,
  Tailwind,
  HTML,
  CSS,
  Sass,
  Git,
  GitHub,
  Netlify,
  VSCode,
  StyledComponents,
  Figma,
  MaterialUI,
} from './skills';

// types
export type DraftPortfolioItemType = {
  title: string;
  description: string;
  url: string;
  code: string;
  type: 'app' | 'website';
  featured: boolean;
  skills: SkillType[];
  tools: SkillType[];
  src?: string;
};

export type SkillType = {
  label: string;
  icon?: IconName;
  color?: string;
  href?: string;
};

export interface PortfolioItemType extends DraftPortfolioItemType {
  id: string;
  featuredImage: {
    src: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };
}

export const portfolioItems: DraftPortfolioItemType[] = [
  {
    title: 'TaskList',
    description:
      'TaskList is a lightweight, intuitive, open source to-do list app, that supports tagging and filtering tasks by labels, due date, and priority level.',
    url: 'https://tasklist-rutterjt.netlify.app/',
    code: 'https://github.com/jonrutter/tasklist',
    type: 'app',
    featured: true,
    skills: [React, TypeScript, MaterialUI],
    tools: [Git, GitHub, Netlify, VSCode],
    src: 'images/tasklist.png',
  },
  {
    title: 'React Film Database',
    description:
      'React Film Database is a web application that allows users to browse and search for details about films.',
    url: 'https://rfdb.netlify.app/',
    code: 'https://github.com/jonrutter/react-film-database',
    type: 'app',
    featured: true,
    skills: [React, Tailwind, TypeScript],
    tools: [Git, GitHub, Netlify, VSCode],
    src: 'images/film.png',
  },
  {
    title: 'Bringing Glory',
    description:
      'A website that I built for a family ministry. Built with Gatsby and a headless CMS. Features a light/dark mode switcher.',
    url: 'https://www.bringingglory.com/',
    code: '',
    type: 'website',
    featured: true,
    skills: [Gatsby, JavaScript, React, StyledComponents],
    tools: [Figma, Git, GitHub, Netlify, VSCode],
    src: './images/bringingglory.png',
  },
  {
    title: 'React Quiz',
    description:
      "A quiz game, built with TypeScript, React, and Tailwind CSS. Fetches questions and answers from the Open Trivia Database API, keeps track of the user's answers, and gives real-time feedback.",
    url: 'https://jonrutter-quiz.netlify.app/',
    code: 'https://github.com/jonrutter/ts-quiz',
    type: 'app',
    featured: false,
    skills: [React, Tailwind, TypeScript],
    tools: [Git, GitHub, Netlify, VSCode],
    src: './images/quiz.png',
  },
  {
    title: 'Grocery List',
    description:
      'A lightweight, intuitive grocery list progressive web app, built with TypeScript, React, and Tailwind CSS.',
    url: 'https://jonrutter-grocery.netlify.app/',
    code: 'https://github.com/jonrutter/grocery-list',
    type: 'app',
    featured: false,
    skills: [React, Tailwind, TypeScript],
    tools: [Git, GitHub, Netlify, VSCode],
    src: './images/grocery.png',
  },
  {
    title: 'Blogr Landing Page',
    description:
      'A demo landing page for a fictional blogging platform, with interactive navigation components. Built with Gatsby and Tailwind CSS, and deployed with Netlify.',
    url: 'https://jonrutter-blogr-landing-page.netlify.app/',
    code: 'https://github.com/jonrutter/blogr-demo',
    type: 'website',
    featured: true,
    skills: [Gatsby, JavaScript, React, Tailwind],
    tools: [Figma, Git, GitHub, Netlify, VSCode],
    src: './images/blogr.png',
  },
  {
    title: 'Manage Landing Page',
    description:
      'A demo landing page for a fictitious software company, with various interactive elements.',
    url: 'https://jonrutter-manage-landing.netlify.app/',
    code: 'https://github.com/jonrutter/manage-demo',
    type: 'website',
    featured: false,
    skills: [CSS, JavaScript, React],
    tools: [Git, GitHub, Netlify, VSCode],
    src: './images/manage.png',
  },
  {
    title: 'Shortly Landing Page',
    description:
      'A demo landing page for a web analytics company, with functioning url shortener component.',
    url: 'https://jonrutter-url-shortener.netlify.app/',
    code: 'https://github.com/jonrutter/shortly-demo',
    type: 'website',
    featured: false,
    skills: [CSS, JavaScript, React],
    tools: [Git, GitHub, Netlify, VSCode],
    src: './images/shortly.png',
  },
  {
    title: 'Fylo Landing Page',
    description: 'A demo landing page for a fictitious cloud storage company.',
    url: 'https://jonrutter-fylo-landing-page.netlify.app/',
    code: 'https://github.com/rutterjt-archive/front-end-projects',
    type: 'website',
    featured: false,
    skills: [HTML, JavaScript, Sass],
    tools: [Git, GitHub, Netlify, VSCode],
    src: './images/fylo.png',
  },
  {
    title: 'Insure Landing Page',
    description: 'A demo landing page for a fictitious insurance company.',
    url: 'https://jonrutter-insure-landing-page.netlify.app/',
    code: 'https://github.com/rutterjt-archive/front-end-projects',
    type: 'website',
    featured: false,
    skills: [HTML, JavaScript, Sass],
    tools: [Git, GitHub, Netlify, VSCode],
    src: './images/insure.png',
  },
  {
    title: 'Huddle Landing Page',
    description:
      'A demo landing page for a fictional software company. Built with Gatsby and Tailwind CSS, and deployed with Netlify.',
    url: 'https://jonrutter-huddle-landing-page.netlify.app/',
    code: 'https://github.com/jonrutter/huddle-demo',
    type: 'website',
    featured: false,
    skills: [Gatsby, JavaScript, React, Tailwind],
    tools: [Figma, Git, GitHub, Netlify, VSCode],
    src: './images/huddle.png',
  },
  {
    title: 'Splitter Tip Calculator',
    description:
      'A tip calculator. Allows users to input a price, tip, and split amount, and calculates the per-person tip and price.',
    url: 'https://jonrutter-splitter.netlify.app/',
    code: 'https://github.com/jonrutter/tip-calculator-app',
    type: 'app',
    featured: false,
    skills: [CSS, JavaScript, React],
    tools: [Figma, Git, GitHub, Netlify, VSCode],
    src: './images/splitter.png',
  },
  {
    title: 'Markdown Previewer',
    description:
      'A markdown previewer. Users can enter text in the editor in markdown format, and see it rendered in real time.',
    url: 'https://jonrutter-markdown-previewer.netlify.app/',
    code: 'https://github.com/jonrutter/markdown-previewer-app',
    type: 'app',
    featured: false,
    skills: [CSS, JavaScript, React],
    tools: [Figma, Git, GitHub, Netlify, VSCode],
    src: './images/markdown.png',
  },
];
