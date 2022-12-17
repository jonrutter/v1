import React, { useState } from 'react';
import { Link } from 'gatsby';

// components
import { Layout, Seo, Hero, ContactForm, Button } from '@/components';

const ContactPage = () => {
  const [sent, setSent] = useState<boolean>(false);
  return (
    <Layout>
      {!sent ? (
        <>
          <Hero title="Contact me">
            <p className="mb-4">I'd love to hear from you!</p>
            <p className="mb-4">
              Use this form to get in touch with me about anything web
              development related, or to just to say hello. I'll try to get back
              to you as soon as I can!
            </p>
          </Hero>
          <div className="pt-12 pb-16 px-6 md:px-12 bg-slate-100 dark:bg-slate-900">
            <div className="max-w-site-sm md:max-w-site-md mx-auto">
              <ContactForm sent={sent} setSent={setSent} />
            </div>
          </div>
        </>
      ) : (
        <Hero title="Message sent">
          <p className="mb-8">
            Thanks for your message! I'll get back to you as soon as I can!{' '}
          </p>
          <Button as={Link} to="/" variant="primary">
            Home
          </Button>
        </Hero>
      )}
    </Layout>
  );
};
export default ContactPage;

export const Head = () => (
  <Seo title="Contact | Jon Rutter" pathname="/contact" />
);
