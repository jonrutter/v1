import React from 'react';

// components
import { Hero, PrimaryButton, SecondaryButton } from '@/components';

export const HomeHero: React.FC = () => (
  <Hero title="Jon Rutter" subtitle="Building websites that shine">
    <p className="mb-4">
      Hello and welcome! I'm a front-end web developer specializing in building
      performative, accessible, and responsive websites with React.
    </p>
    <p className="mb-4">
      I'm passionate about building great websites for my clients, contributing
      to open source projects, and expanding my knowledge about web and software
      development.
    </p>
    <p className="mb-4">
      I'm currently available for work. Contact me for inquiries, or just to say
      hello!
    </p>
    <div className="text-center md:text-left mt-8 md:mt-8 flex flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0 sm:space-x-8">
      <PrimaryButton to="/contact" className="w-full sm:w-auto">
        Contact me
      </PrimaryButton>
      <SecondaryButton to="/portfolio" className="w-full sm:w-auto">
        My portfolio
      </SecondaryButton>
    </div>
  </Hero>
);
