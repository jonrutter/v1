import React from 'react';

// components
import { Layout, Seo, Hero, ContactForm } from '@/components';

const ContactPage = () => (
  <Layout>
    <Seo title="Contact Me | Jon Rutter" pathname="/contact" />
    <Hero title="Contact me" subtitle="Let's get in touch" short>
      <p className="mb-4">
        I'm currently available for work. Use this form to get in touch with me
        for inquiries, or just to say hello. I'll get back to you as soon as I
        can!
      </p>
    </Hero>
    <div className="pb-16 px-6 md:px-12 transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50">
      <section className="max-w-site-sm md:max-w-site-md mx-auto">
        <ContactForm />
      </section>
    </div>
  </Layout>
);

export default ContactPage;
