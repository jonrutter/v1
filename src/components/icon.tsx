import React from 'react';

// types
import { IconBaseProps } from 'react-icons';

// icon imports
import { FaGithub, FaTwitter, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiHtml5,
  SiCss3,
  SiSass,
  SiTailwindcss,
  SiRedux,
  SiGatsby,
  SiExpress,
  SiGit,
  SiVisualstudiocode,
  SiNetlify,
  SiWordpress,
  SiFigma,
  SiMongodb,
  SiMaterialui,
  SiStyledcomponents,
} from 'react-icons/si';
import { FiExternalLink } from 'react-icons/fi';

/*
Adding an icon to the component:
- 1. Import the icon here
- 2. Update `icons` with a new key/value pair of the icon's name/component.

This should support both direct imports from react-icons, as well as custom react components that render an svg element.
*/

// data structure mapping a string representation of an icon to a component that renders the icon
const icons = {
  github: FaGithub,
  twitter: FaTwitter,
  linkedin: FaLinkedinIn,
  email: FaEnvelope,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  html: SiHtml5,
  css: SiCss3,
  sass: SiSass,
  tailwind: SiTailwindcss,
  redux: SiRedux,
  gatsby: SiGatsby,
  express: SiExpress,
  git: SiGit,
  vscode: SiVisualstudiocode,
  netlify: SiNetlify,
  wordpress: SiWordpress,
  figma: SiFigma,
  mongodb: SiMongodb,
  materialui: SiMaterialui,
  external: FiExternalLink,
  styledcomponents: SiStyledcomponents,
};

// types
type IconProps = IconBaseProps &
  Omit<React.ComponentPropsWithoutRef<'svg'>, keyof IconBaseProps>;

export type IconName = keyof typeof icons;

interface Props extends IconProps {
  name: IconName;
}

/**
 * Renders a site icon. Accepts a name prop as an IconName. Passes all other props directly to the underlying icon.
 */
export const Icon: React.FC<Props> = ({ name, ...rest }) => {
  const Icon = icons[name];
  return <Icon role="none" aria-hidden {...rest} />;
};
