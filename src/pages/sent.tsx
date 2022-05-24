import React from 'react';

// components
import { Layout, Seo, Hero, CTAButton } from '@/components';

const SentPage: React.FC = () => (
  <Layout>
    <Seo title="Thank You | Jon Rutter" pathname="/sent" />
    <Hero title="Thank you!">
      <p className="mb-4">
        Thank you for your message! I'll get back to you as soon as I can!
      </p>
      <div className="text-center md:text-left mt-12 md:mt-8 mb-16">
        <CTAButton to="/" className="w-full sm:w-auto">
          Home
        </CTAButton>
      </div>
    </Hero>
  </Layout>
);

export default SentPage;
