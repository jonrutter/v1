import React from 'react';

// components
import { PrimaryButton } from '@/components';

/**
 * Renders a page's CTA Box
 */
export const CTABox: React.FC = () => (
  <div className="px-6 md:px-12 transition-all -mt-20 md:mt-0 bg-inherit text-slate-700 dark:text-slate-200">
    <div className="max-w-site-md lg:max-w-site-lg mx-auto translate-y-1/2 bg-white dark:bg-gradient-to-br dark:from-slate-600 dark:to-slate-800 py-12 px-8 md:px-10 lg:py-16 lg:px-12 rounded-3xl shadow-lg transition-all overflow-hidden">
      <section className="grid grid-cols-1 items-center justify-items-center max-w-sm mx-auto gap-4 md:gap-12 md:grid-cols-2 md:max-w-full lg:grid-cols-3 lg:gap-16">
        <h2 className="transition-all font-heading font-black text-3xl md:text-4xl text-slate-900 dark:text-slate-50">
          Let's get in touch
        </h2>
        <p className="text-lg">
          I'm currently available for work. Get in touch with me for inquiries,
          or just to say hi!
        </p>
        <div className="md:col-span-full lg:col-auto">
          <PrimaryButton to="/contact">Contact me</PrimaryButton>
        </div>
      </section>
      <div className="shine opacity-50 dark:opacity-40" />
    </div>
  </div>
);
