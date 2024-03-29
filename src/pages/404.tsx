import React from 'react';

// components
import { Layout, Seo, Hero, Button } from '@/components';

const NotFoundPage: React.FC = () => (
  <Layout>
    <Seo title="404: Not Found" />
    <Hero title="404: Not Found">
      <p className="mb-4">
        Oops! The page you were looking for could not be found. It may have been
        moved, deleted, or never existed at all. Sorry about that!
      </p>
      <div className="text-center md:text-left mt-12 md:mt-8 mb-16">
        <Button to="/" className="w-full sm:w-auto" variant="primary">
          Home
        </Button>
      </div>
    </Hero>
  </Layout>
);

export default NotFoundPage;

export const Head = () => <Seo title="404: Not Found" />;
