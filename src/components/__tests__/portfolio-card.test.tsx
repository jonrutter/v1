import React from 'react';
import { render, screen } from 'test-utils';

import { PortfolioCard } from '../portfolio-card';
import { PortfolioItemType } from '@/types';

const item: PortfolioItemType = {
  title: 'TaskList',
  description:
    'TaskList is a lightweight, intuitive, open source to-do list app, that supports tagging and filtering tasks by labels, due date, and priority level.',
  url: 'https://tasklist-rutterjt.netlify.app/',
  code: 'https://github.com/rutterjt/tasklist',
  type: 'app',
  featured: true,
  skills: [
    {
      label: 'React',
      icon: 'react',
      color: '#61DAFB',
      href: 'https://reactjs.org/',
    },
    {
      label: 'TypeScript',
      icon: 'typescript',
      color: '#3178C6',
    },
    {
      label: 'Material UI',
      icon: 'materialui',
    },
  ],
  tools: [],
  id: '3d117e08-bde7-5584-8a5f-b562a7fd1739',
  featuredImage: {
    src: {
      childImageSharp: {
        gatsbyImageData: {
          layout: 'constrained',
          placeholder: {
            fallback: '',
          },
          backgroundColor: 'transparent',
          images: {
            fallback: {
              src: '',
              srcSet: '',
              sizes: '',
            },
            sources: [
              {
                srcSet: '',
                type: '',
                sizes: '',
              },
            ],
          },
          width: 1200,
          height: 675,
        },
      },
    },
  },
};

describe('Portfolio Card', () => {
  it('renders the correct content', () => {
    render(<PortfolioCard item={item} />);

    // title
    const titleLink = screen.getByText(item.title);
    expect(titleLink).toHaveAttribute('href', item.url);

    // description
    screen.getByText(item.description);

    // should render links to the code and live site
    screen.getByLabelText(/view project code/i);
    screen.getByLabelText(/view live site/i);

    // should render each skill
    item.skills.forEach((skill) => {
      screen.getByText(skill.label);
    });

    // if a skill has an href, it should render as a link
    const reactSkill = item.skills[0];
    const reactChip = screen.getByTestId(`chip-${reactSkill.label}`);
    expect(reactChip).toHaveAttribute('href', reactSkill.href);
  });
  it('renders correctly as a reversed card', () => {
    render(<PortfolioCard item={item} reversed />);
  });
});
