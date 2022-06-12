import React from 'react';
import clsx from 'clsx';

import { UseFormRegister, FieldError } from 'react-hook-form';

// types
import type { FormDataType, FieldName } from './contact-form';

// components
import { Label, ErrorMessage } from '@/components';

type Props<T extends React.ElementType> = {
  as?: T;
  name: FieldName;
  label: string;
  register: UseFormRegister<FormDataType>;
  required?: boolean;
  pattern?: RegExp;
  error?: FieldError;
};

/**
 * Renders a form input field.
 */
export const Input = <T extends React.ElementType = 'input'>({
  name,
  label,
  register,
  error,
  required,
  as,
  ...rest
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  // set underlying component
  const Tag = as || 'input';

  // define validation regex pattern if input is for email
  const pattern =
    name === 'your-email'
      ? /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/
      : undefined;

  // input type: undefined if component is <textarea>
  const type =
    as === 'textarea' ? undefined : name === 'your-email' ? 'email' : 'text';

  return (
    <>
      <Label htmlFor={name} required>
        {label}
      </Label>
      <Tag
        className={clsx(
          'w-full min-w-full rounded-lg py-2 px-4 transition-all appearance-none bg-white dark:bg-slate-900 border-2 dark:text-white outline-none focus:outline-none focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-2',
          !!error
            ? 'border-red-600 focus:ring-red-600'
            : 'border-slate-400 dark:border-slate-500 focus:ring-sea-500 dark:focus:ring-sea-400',
          as === 'textarea' && 'resize-vertical h-40'
        )}
        {...register(name, { required, pattern })}
        id={name}
        type={type}
        {...rest}
      />
      {error && <ErrorMessage error={error} />}
    </>
  );
};

