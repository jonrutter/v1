import React from 'react';
import { Helmet } from 'react-helmet';
import { render } from 'test-utils';

import { PureSeo } from '../seo';

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

const meta = [
  {
    name: 'theme-color',
    content: '#ffffff',
  },
];

describe('Seo component', () => {
  it('renders the correct default content', () => {
    render(<PureSeo siteMetadata={siteMetadata} pathname="/" />);
    const helmet = Helmet.peek();
    // extract tag info from helmet metadata
    const { metaTags, linkTags } = helmet;
    const author = metaTags.find((tag) => tag?.name === 'author');
    const description = metaTags.find((tag) => tag.name === 'description');
    const twitter = metaTags.find((tag) => tag.name === 'twitter:creator');
    const canonical = linkTags.find((tag) => tag.rel === 'canonical');

    // because no overriding props were passed in, all metadata should reflect the default in the mocked siteMetadata query
    expect(helmet.title).toBe(siteMetadata.title);
    expect(description?.content).toBe(siteMetadata.description);
    expect(author?.content).toBe(siteMetadata.author);
    expect(canonical?.href).toBe(siteMetadata.siteUrl); // seo curtails trailing slashes in canonical links, so even though a pathname was passed in, the canonical link should still be just the siteUrl
    expect(twitter?.content).toBe(siteMetadata.twitterUsername);
    expect(helmet.htmlAttributes?.lang).toBe(siteMetadata.lang);
  });
  it('renders overriding metadata correctly', () => {
    render(<PureSeo siteMetadata={siteMetadata} {...props} />);
    const helmet = Helmet.peek();
    // extract tag info from helmet metadata
    const { metaTags, linkTags } = helmet;
    const author = metaTags.find((tag) => tag?.name === 'author');
    const description = metaTags.find((tag) => tag.name === 'description');
    const twitter = metaTags.find((tag) => tag.name === 'twitter:creator');
    const canonical = linkTags.find((tag) => tag.rel === 'canonical');

    // because overriding props were passed in, all metadata should reflect the updated information, instead of the base siteMetadata
    expect(helmet.title).toBe(props.title);
    expect(description?.content).toBe(props.description);
    expect(author?.content).toBe(props.author);
    expect(canonical?.href).toBe(`${siteMetadata.siteUrl}${props.pathname}`);
    expect(twitter?.content).toBe(props.twitterUsername);
    expect(helmet.htmlAttributes?.lang).toBe(props.lang);
  });
  it('renders extra passed metadata', () => {
    // the seo component supports passing arbitrary extra metadata as an array throught the `meta` prop, every key/value pair in the `meta` array should have its own `<meta>` tag, where the key is the meta name, and the value is the meta content
    render(<PureSeo siteMetadata={siteMetadata} meta={meta} />);
    const helmet = Helmet.peek();
    const { metaTags } = helmet;
    const color = metaTags.find((tag) => tag.name === meta[0].name);
    expect(color?.content).toBe(meta[0].content);
  });
});
