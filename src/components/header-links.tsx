import React from 'react';
import { Link } from 'gatsby';

// util func
const formatId = (str: string) => str.toLowerCase().split(' ').join('-');

/* Hash Link Component */

type LinkProps = {
  to: string;
  heading: string;
};

const HashLink: React.FC<LinkProps> = ({ to, heading }) => (
  <Link
    to={to}
    aria-label={`Link to heading ${heading}`}
    className="not-prose pl-2 opacity-0 group-hover:opacity-100 no-underline hover:underline select-none before:[content:_'#'] focus:opacity-100"
  />
);

/* Header components */
type Props = {
  children: string;
};

export const AutoLinkH2: React.FC<Props> = ({ children }) => {
  const id = formatId(children);
  return (
    <h2 id={id} className="not-prose group">
      {children}
      <HashLink to={`#${id}`} heading={children} />
    </h2>
  );
};

export const AutoLinkH3: React.FC<Props> = ({ children }) => {
  const id = formatId(children);
  return (
    <h3 id={id} className="not-prose group">
      {children}
      <HashLink to={`#${id}`} heading={children} />
    </h3>
  );
};
