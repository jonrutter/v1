import React from 'react';

// data
import { menu, socialLinks } from '@/config';

// components
import { Icon, StyledLink, IconButton } from '@/components';

import Logo from '@/images/site-logo.png';

type Props = {
  short?: boolean;
};

/**
 * Renders the site footer.
 */
export const Footer: React.FC<Props> = ({ short }) => (
  <>
    <div
      className={`bg-slate-900 text-slate-50 px-6 md:px-12 pb-12 ${
        short ? 'pt-28' : 'pt-72'
      } text-lg`}
    >
      <footer className="max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row items-center text-center mb-16 md:justify-between">
          <div className="mb-12 md:mr-8 md:mb-0">
            <img
              src={Logo}
              alt="Jon Rutter"
              className="max-w-[54px] h-auto select-none pointer-events-none"
            />
          </div>
          <ul className="flex flex-col mb-8 md:flex-row md:items-center md:m-0 space-y-6 md:space-y-0 md:space-x-4 lg:space-x-8">
            {menu.map(({ url, name }, index) => (
              <li key={index}>
                <StyledLink to={url} className="text-white hover:text-sea-400">
                  {name}
                </StyledLink>
              </li>
            ))}
          </ul>
          <ul className="flex text-2xl space-x-1 lg:space-x-4">
            {socialLinks.map(({ url, name, icon }, index) => (
              <li key={index}>
                <IconButton
                  as="a"
                  href={url}
                  aria-label={name}
                  title={name}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name={icon} aria-hidden />
                </IconButton>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-base text-center">
          <StyledLink
            as="a"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/rutterjt/v1/tree/main#license"
            className="text-white hover:text-sea-400"
          >
            © {new Date().getFullYear()}, Jon Rutter
          </StyledLink>
        </p>
      </footer>
    </div>
  </>
);
