import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'gatsby';

// util func
import { formatId } from '@/utils/formatId';

/* Hash Link Component */

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

const Hash: React.FC = () => (
  <span
    aria-hidden
    className="not-prose ml-2 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 select-none pointer-events-none inline-block outline-none"
  >
    #
  </span>
);

/* Header components */
type Props = {
  children: React.ReactNode;
};

export const AutoLinkH2: React.FC<Props> = ({ children }) => {
  const [title, ref] = useTitle(children);
  const id = formatId(title);
  return (
    <h2 ref={ref} id={id} className="not-prose" data-testid={id}>
      <Link
        to={`#${id}`}
        className="not-prose hover:underline focus-visible:underline group outline-none"
      >
        {children}
        <Hash />
      </Link>
    </h2>
  );
};

export const AutoLinkH3: React.FC<Props> = ({ children }) => {
  const [title, ref] = useTitle(children);
  const id = formatId(title);
  return (
    <h3 ref={ref} id={id} className="not-prose group" data-testid={id}>
      <Link
        to={`#${id}`}
        className="not-prose hover:underline focus-visible:underline group outline-none"
      >
        {children}
        <Hash />
      </Link>
    </h3>
  );
};
