import React from 'react';

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
} from 'react-icons/si';
import { FiExternalLink } from 'react-icons/fi';
import { IconType } from 'react-icons';

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
};

// types
type RIBaseProps = React.ComponentPropsWithoutRef<IconType>;

type IconProps = RIBaseProps &
  Omit<React.ComponentPropsWithoutRef<'svg'>, keyof RIBaseProps>;

interface Props extends IconProps {
  name: keyof typeof icons;
}

/**
 * Renders a site icon. Accepts a name props representing a key of `icons`. Passes all other props directly to the underlying icon.
 */
export const Icon: React.FC<Props> = ({ name, className = '', ...rest }) => {
  const Icon = icons[name as keyof typeof icons];
  if (Icon) return <Icon className={className} {...rest} />;
  console.warn(
    `Invalid icon name: ${name}. If you expect this icon to be available, make sure it is imported in icons.`
  );
  return null;
};
