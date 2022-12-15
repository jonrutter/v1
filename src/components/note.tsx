import React from 'react';
import clsx from 'clsx';

const className = {
  grey: 'border-slate-500 bg-slate-100 text-slate-700 da dark:bg-slate-700/80 dark:text-slate-100',
  green:
    'border-emerald-500 bg-emerald-100 text-emerald-900 dark:bg-emerald-900/80 dark:text-emerald-100',
  yellow:
    'border-amber-500 bg-amber-100 text-amber-800 dark:text-amber-100 dark:bg-amber-800/80',
  blue: 'border-indigo-500 bg-indigo-100 text-indigo-900 dark:text-indigo-100 dark:bg-indigo-900/80',
  red: 'border-red-500 bg-red-100 text-red-900 dark:text-red-100 dark:bg-red-900/80',
};

const colors = className;

type Props = {
  color?: keyof typeof colors;
  children: React.ReactNode;
};

export const Note: React.FC<Props> = ({ color = 'grey', children }) => (
  <div
    className={clsx(
      'note border-l-4 px-4 py-2 my-[1.333333em] rounded-md',
      colors[color]
    )}
  >
    {children}
  </div>
);

export const CodeNote: React.FC<{ href: string }> = ({ href }) => (
  <Note color="green">
    <em>
      You can find all the{' '}
      <a href={href}>code examples for this tutorial here</a>.
    </em>
  </Note>
);
