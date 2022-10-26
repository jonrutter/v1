import React from 'react';

export const SkipToContent: React.FC = () => (
  <a
    href="#main"
    className="fixed top-24 left-0 bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-50 z-[9999] text-lg py-2 px-4 underline -translate-x-full focus:translate-x-1 transition-all rounded-xl shadow-md outline-none focus:ring-2 focus:ring-slate-900 focus:dark:ring-slate-50"
  >
    Skip to content
  </a>
);
