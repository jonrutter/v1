import React from 'react';

/*
Credit: https://codepen.io/ingomc/pen/ONrMqe
*/

export const Spinner: React.FC = () => (
  <svg
    viewBox="25 25 50 50"
    className="w-16 origin-center animate-rotate-outer"
    data-testid="spinner"
  >
    <circle
      cx="50"
      cy="50"
      r="20"
      strokeDasharray="1, 200"
      strokeDashoffset="0"
      fill="none"
      className="animate-rotate-inner stroke-slate-900 dark:stroke-white stroke-[3]"
    />
  </svg>
);
