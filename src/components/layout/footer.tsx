import React from 'react';

// data
import { menu, socialLinks } from '@/config';

// components
import { Icon, StyledLink, IconButton } from '@/components';
import { Logo } from '../logo';

type Props = {
  blogPost?: boolean;
};

const FooterDivider: React.FC<Props> = ({ blogPost }) => (
  <svg
    height="148"
    viewBox="0 0 1920 148"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full min-w-full max-w-full ${
      !!blogPost
        ? 'bg-white dark:bg-slate-900'
        : 'bg-slate-100 dark:bg-slate-900'
    }`}
    preserveAspectRatio="none"
  >
    <g clipPath="url(#clip0_1009_2359)">
      <path
        d="M1920 0H0V148H1920V0Z"
        className="fill-white dark:fill-slate-800"
        fillOpacity="0"
      />
      <path
        d="M0 8L160 18L320 47L480 21L640 5L800 22L960 26L1120 0L1280 2L1440 31L1600 40L1760 13L1920 9V149H1760H1600H1440H1280H1120H960H800H640H480H320H160H0V8Z"
        className="fill-white dark:fill-slate-800"
        fillOpacity="0.3"
      />
      <path
        d="M0 38L160 60L320 41L480 83L640 82L800 50L960 36L1120 44L1280 61L1440 46L1600 37L1760 58L1920 61V149H1760H1600H1440H1280H1120H960H800H640H480H320H160H0V38Z"
        className="fill-white dark:fill-slate-800"
        fillOpacity="0.6"
      />
      <path
        d="M0 114L160 109L320 116L480 108L640 95L800 78L960 98L1120 105L1280 81L1440 100L1600 117L1760 108L1920 88V149H1760H1600H1440H1280H1120H960H800H640H480H320H160H0V114Z"
        className="fill-white dark:fill-slate-800"
      />
    </g>
    <defs>
      <clipPath id="clip0_1009_2359">
        <rect width="1920" height="148" className="fill-transparent" />
      </clipPath>
    </defs>
  </svg>
);

/**
 * Site Footer Content
 */
const FooterContent: React.FC = () => (
  <footer
    className="relative w-full min-w-screen overflow-x-hidden bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-200"
    tabIndex={-1}
  >
    {/* content */}
    <div className={`px-6 md:px-12 pb-12 text-lg pt-4 md:pt-12 lg:pt-16`}>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row items-center text-center mb-16 md:justify-between">
          <div className="mb-12 md:mr-8 md:mb-0 w-12 h-auto">
            <Logo />
          </div>
          <ul className="flex flex-col mb-8 md:flex-row md:items-center md:m-0 space-y-6 md:space-y-0 md:space-x-4 lg:space-x-8">
            {menu.map(({ url, name }, index) => (
              <li key={index}>
                <StyledLink to={url}>{name}</StyledLink>
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
            className="text-slate-500 dark:text-slate-300"
          >
            © {new Date().getFullYear()}, Jon Rutter
          </StyledLink>
        </p>
      </div>
    </div>
  </footer>
);

export const Footer: React.FC<Props> = ({ blogPost }) => (
  <>
    <FooterDivider blogPost={blogPost} />
    <FooterContent />
  </>
);
