import * as React from 'react';
import { Link } from 'gatsby';

// markup
const NotFoundPage = () => {
  return (
    <main className="max-w-screen-md bg-white text-slate-900 mx-auto py-8">
      <h1 className="text-center font-black text-6xl font-heading mb-12">
        404 Not Found.
      </h1>
      <Link to="/" className="text-indigo-800 hover:underline">
        Back to Home
      </Link>
    </main>
  );
};

export default NotFoundPage;
