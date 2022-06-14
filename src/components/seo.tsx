import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

type HeaderImage = {
  src: string;
  height: number;
  width: number;
};

type BaseProps = {
  title?: string;
  description?: string;
  author?: string;
  twitterUsername?: string;
  lang?: string;
  image?: HeaderImage;
  keywords?: string[];
  article?: boolean;
  pathname?: string;
  meta?: any[];
};

type SiteMetadata = {
  title: string;
  description: string;
  author: string;
  siteUrl: string;
  twitterUsername: string;
  lang: string;
};

interface Props extends BaseProps {
  siteMetadata: SiteMetadata;
}

export const PureSeo: React.FC<Props> = ({
  siteMetadata,
  title,
  description,
  author,
  twitterUsername,
  lang,
  image: metaImage,
  pathname,
  article,
  keywords = [],
  meta = [],
}) => {
  // remove trailing slashes from pathname
  let seoPathname;
  if (pathname) {
    seoPathname =
      pathname[pathname.length - 1] === '/' ? pathname.slice(0, -1) : pathname;
  }

  // compare props to query results: favor props, then fall back to siteMetadata
  const seo = {
    title: title || siteMetadata.title,
    description: description || siteMetadata.description,
    lang: lang || siteMetadata.lang || 'en', // fall back to english
    image:
      metaImage && metaImage.src
        ? {
            src: `${siteMetadata.siteUrl}${metaImage.src}`,
            height: metaImage.height,
            width: metaImage.width,
          }
        : null,
    canonical:
      seoPathname !== undefined
        ? `${siteMetadata.siteUrl}${seoPathname}`
        : undefined,
    keywords,
    twitterUsername: twitterUsername || siteMetadata.twitterUsername,
    author: author || siteMetadata.author,
  };

  // attributes to be injected into the html tag
  const htmlContent = { lang: seo.lang };

  // metadata
  const metaContent = [
    // metadata that can always be set
    { property: 'og:title', content: seo.title },
    { property: 'og:type', content: article ? 'article' : 'website' },
    { name: 'twitter:title', content: seo.title },
  ]
    .concat(
      seo.description
        ? [
            // description
            { name: 'description', content: seo.description },
            { property: 'og:description', content: seo.description },
            { name: 'twitter:description', content: seo.description },
          ]
        : []
    )
    .concat(
      seo.keywords.length
        ? [
            // keywords
            { name: 'keywords', content: seo.keywords.join(',') },
          ]
        : []
    )
    .concat(
      seo.image
        ? [
            // image
            { name: 'image', content: seo.image.src },
            { property: 'og:image', content: seo.image.src },
            { property: 'og:image:width', content: `${seo.image.width}` },
            {
              property: 'og:image:height',
              content: `${seo.image.height}`,
            },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:image', content: `${seo.image.src}` },
          ]
        : [
            // fallback twitter card type, in case of no image
            { name: 'twitter:card', content: 'summary' },
          ]
    )
    .concat(
      seo.twitterUsername
        ? [
            // twitter username
            {
              name: 'twitter:creator',
              content: seo.twitterUsername,
            },
          ]
        : []
    )
    .concat(seo.author ? [{ name: 'author', content: seo.author }] : [])
    .concat(
      seo.canonical
        ? [
            // canonical link
            {
              property: 'og:url',
              content: seo.canonical,
            },
          ]
        : []
    )
    .concat(meta ? meta : []); // concatenate any extra meta passed directly to the component

  // page's title
  let pageTitle = seo.title;

  // if there is a canonical link, render it
  const pageLink = seo.canonical
    ? [{ rel: 'canonical', href: seo.canonical }]
    : [];

  return (
    <Helmet
      htmlAttributes={htmlContent}
      title={pageTitle}
      link={pageLink}
      meta={metaContent}
    />
  );
};

/**
 * An extensible, general-purpose SEO component for Gatsby sites. Queries your siteMetadata, accepts overriding props, and injects the metadata into your page's head.
 */
export const Seo: React.FC<BaseProps> = (props) => {
  // query to get site metadata
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          twitterUsername
          lang
        }
      }
    }
  `);
  return <PureSeo siteMetadata={siteMetadata} {...props} />;
};
