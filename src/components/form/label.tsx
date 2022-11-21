import React from 'react';

type Props = {
  htmlFor: string;
  required: boolean;
};

export const Label: React.FC<Props> = ({ htmlFor, required, children }) => (
  <label htmlFor={htmlFor} className="block mb-1 font-heading font-medium">
    {children}
    {required && <abbr title="required">*</abbr>}
  </label>
);
