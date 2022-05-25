import React from 'react';
import type { FieldError } from 'react-hook-form';

type Props = {
  error: FieldError;
};

export const ErrorMessage: React.FC<Props> = ({ error }) => (
  <p className="transition-all text-sm mt-2 inline-block bg-slate-300 dark:bg-slate-500 py-2 px-4 rounded-lg relative shadow-lg">
    <span className="absolute -top-[0.45rem] left-2 h-0 w-0 border-l-[0.4rem] border-l-transparent border-r-[0.4rem] border-r-transparent border-b-[0.5rem] border-b-slate-300 dark:border-b-slate-500 transition-all" />
    {error.type === 'pattern'
      ? 'Please enter a valid email'
      : 'This field is required'}
  </p>
);
