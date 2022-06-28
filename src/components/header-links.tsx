import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'gatsby';

// util func
const formatId = (str: string) =>
  str
    .replace(/[^\w|\s]/g, '')
    .replace(/\s{2,}/g, ' ')
    .toLowerCase()
    .split(' ')
    .join('-');

/* Hash Link Component */

type LinkProps = {
  to: string;
  heading: string;
};

const HashLink: React.FC<LinkProps> = ({ to, heading }) => (
  <Link
    to={to}
    aria-label={`Link to heading ${heading}`}
    className="not-prose ml-2 opacity-0 group-hover:opacity-100 select-none before:[content:_'#'] focus:opacity-100 inline-block relative hover:!text-sea-600 dark:!text-sea-400"
  />
);

// helper hook
const useTitle = (rawTitle: React.ReactNode) => {
  const eleRef = useRef<HTMLHeadingElement>(null);
  const [title, setTitle] = useState<string>('');
  useEffect(() => {
    setTitle(eleRef.current?.textContent || '');
  }, []);
  return useMemo(
    () => [title, eleRef] as [string, React.RefObject<HTMLHeadingElement>],
    [title]
  );
};

/* Header components */
type Props = {
  children: React.ReactNode;
};

export const AutoLinkH2: React.FC<Props> = ({ children }) => {
  const [title, ref] = useTitle(children);
  const id = formatId(title);
  return (
    <h2 ref={ref} id={id} className="not-prose group" data-testid={id}>
      {children}
      <HashLink to={`#${id}`} heading={title} />
    </h2>
  );
};

export const AutoLinkH3: React.FC<Props> = ({ children }) => {
  const [title, ref] = useTitle(children);
  const id = formatId(title);
  return (
    <h3 ref={ref} id={id} className="not-prose group" data-testid={id}>
      {children}
      <HashLink to={`#${id}`} heading={title} />
    </h3>
  );
};
