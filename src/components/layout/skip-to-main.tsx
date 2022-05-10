import React from 'react';

export const SkipToContent: React.FC = () => (
  <a
    href="#main"
    className="fixed top-24 left-0 bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-50 z-[9999] text-lg py-3 px-6 underline -translate-x-48 focus:translate-x-0 transition-all rounded-md shadow-md outline-none border-2 border-slate-900 dark:border-slate-50 ring-2 ring-sea-500"
  >
    Skip to content
  </a>
);
