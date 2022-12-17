import React from 'react';
import { render } from 'test-utils';

import { BaseSeo } from '../seo';

const siteMetadata = {
  title: `Jon Rutter's Portfolio Website`,
  description: `I am a frontend developer specializing in building fast, user-focused websites with React.`,
  author: `Jon Rutter`,
  siteUrl: `https://www.jonrutter.io`,
  twitterUsername: `@rutterjt`,
  lang: `en`,
};

const props = {
  pathname: '/blog',
  author: 'John Doe',
  twitterUsername: '@faketwitterhandle',
  title: 'Jon Rutter | Blog',
  description: 'This is my blog',
  article: true,
  lang: 'en-us',
};

describe('Seo component', () => {
  it('renders the correct default content', () => {
    render(<BaseSeo siteMetadata={siteMetadata} pathname="/" />);
    // select meta tags
    const title = document.querySelector('title');
    const ogTitle = document.querySelector('[property="og:title"]');
    const ogType = document.querySelector('[property="og:type"]');
    const twitterTitle = document.querySelector('[name="twitter:title"]');
    const description = document.querySelector('[name="description"]');
    const ogDescription = document.querySelector('[property="og:description"]');
    const twitterDescription = document.querySelector(
      '[name="twitter:description"]'
    );
    const twitterCard = document.querySelector('[name="twitter:card"]');
    const twitterUsername = document.querySelector('[name="twitter:creator"]');
    const author = document.querySelector('[name="author"]');
    const ogUrl = document.querySelector('[property="og:url"]');
    const canonicalLink = document.querySelector('[rel="canonical"]');

    // because no overriding props were passed in, all metadata content should reflect the defaults in the mocked siteMetadata query
    expect(title).toHaveTextContent(siteMetadata.title);
    expect(ogTitle).toHaveAttribute('content', siteMetadata.title);
    expect(twitterTitle).toHaveAttribute('content', siteMetadata.title);
    expect(ogType).toHaveAttribute('content', 'website');
    expect(description).toHaveAttribute('content', siteMetadata.description);
    expect(ogDescription).toHaveAttribute('content', siteMetadata.description);
    expect(twitterDescription).toHaveAttribute(
      'content',
      siteMetadata.description
    );
    expect(twitterCard).toHaveAttribute('content', 'summary');
    expect(twitterUsername).toHaveAttribute(
      'content',
      siteMetadata.twitterUsername
    );
    expect(author).toHaveAttribute('content', siteMetadata.author);
    expect(ogUrl).toHaveAttribute('content', siteMetadata.siteUrl);
    expect(canonicalLink).toHaveAttribute('href', siteMetadata.siteUrl);
  });
  it('renders overriding metadata correctly', () => {
    render(<BaseSeo siteMetadata={siteMetadata} {...props} />);
    // select meta tags
    const title = document.querySelector('title');
    const ogTitle = document.querySelector('[property="og:title"]');
    const ogType = document.querySelector('[property="og:type"]');
    const twitterTitle = document.querySelector('[name="twitter:title"]');
    const description = document.querySelector('[name="description"]');
    const ogDescription = document.querySelector('[property="og:description"]');
    const twitterDescription = document.querySelector(
      '[name="twitter:description"]'
    );
    const twitterUsername = document.querySelector('[name="twitter:creator"]');
    const author = document.querySelector('[name="author"]');
    const ogUrl = document.querySelector('[property="og:url"]');
    const canonicalLink = document.querySelector('[rel="canonical"]');

    // because overriding props were passed in, all metadata should reflect the updated information, instead of the default siteMetadata
    expect(title).toHaveTextContent(props.title);
    expect(ogTitle).toHaveAttribute('content', props.title);
    expect(twitterTitle).toHaveAttribute('content', props.title);
    expect(ogType).toHaveAttribute('content', 'article');
    expect(description).toHaveAttribute('content', props.description);
    expect(ogDescription).toHaveAttribute('content', props.description);
    expect(twitterDescription).toHaveAttribute('content', props.description);
    expect(twitterUsername).toHaveAttribute('content', props.twitterUsername);
    expect(author).toHaveAttribute('content', props.author);
    expect(ogUrl).toHaveAttribute(
      'content',
      `${siteMetadata.siteUrl}${props.pathname}`
    );
    expect(canonicalLink).toHaveAttribute(
      'href',
      `${siteMetadata.siteUrl}${props.pathname}`
    );
  });
});
