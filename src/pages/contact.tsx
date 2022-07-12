import React, { useState } from 'react';
import { Link } from 'gatsby';

// components
import { Layout, Seo, Hero, ContactForm, PrimaryButton } from '@/components';

const ContactPage = () => {
  const [sent, setSent] = useState<boolean>(false);
  return (
    <Layout>
      <Seo title="Contact Me | Jon Rutter" pathname="/contact" />
      {!sent ? (
        <Hero title="Contact me" subtitle="Let's get in touch" short>
          <p className="mb-4">
            Use this form to get in touch with me about anything web development
            related, or to just to say hello. I'll get back to you as soon as I
            can!
          </p>
        </Hero>
      ) : (
        <Hero title="Message sent" subtitle="Thank you!" short>
          <p className="mb-4">
            Thanks for your message! I'll get back to you as soon as I can!{' '}
          </p>
          <PrimaryButton as={Link} to="/">
            Home
          </PrimaryButton>
        </Hero>
      )}

      <div className="pb-16 px-6 md:px-12 transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50">
        <div className="max-w-site-sm md:max-w-site-md mx-auto">
          <ContactForm sent={sent} setSent={setSent} />
        </div>
      </div>
    </Layout>
  );
};
export default ContactPage;
