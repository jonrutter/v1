import React from 'react';

// components
import { Hero, PrimaryButton, SecondaryButton } from '@/components';

// social
import { links } from '@/config';

export const PortfolioHero: React.FC = () => (
  <Hero title="My portfolio" subtitle="Check out some of my latest work">
    <p className="mb-4">
      Here are some of my recent projects and client websites.
    </p>
    <p className="mb-4">
      Feel free to also check out my GitHub account to see more of my projects
      and open source contributions.
    </p>
    <div className="text-center md:text-left mt-8 md:mt-8 flex flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0 sm:space-x-8">
      <PrimaryButton to="/contact" className="w-full sm:w-auto">
        Contact me
      </PrimaryButton>
      <SecondaryButton as="a" href={links.github} className="w-full sm:w-auto">
        My GitHub
      </SecondaryButton>
    </div>
  </Hero>
);
