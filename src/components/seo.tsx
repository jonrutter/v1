import React from 'react';
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
  image?: HeaderImage;
  keywords?: string[];
  article?: boolean;
  pathname?: string;
  children?: React.ReactNode;
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

export const BaseSeo: React.FC<Props> = ({
  siteMetadata,
  title,
  description,
  author,
  twitterUsername,
  image: metaImage,
  pathname,
  article,
  keywords = [],
  children,
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

  return (
    <>
      <title id="title">{seo.title}</title>
      <meta id="og:title" property="og:title" content={seo.title} />
      <meta
        id="og:type"
        property="og:type"
        content={article ? 'article' : 'website'}
      />
      <meta id="twitter:title" name="twitter:title" content={seo.title} />
      {seo.description && (
        <>
          <meta id="description" name="description" content={seo.description} />
          <meta
            id="og:description"
            property="og:description"
            content={seo.description}
          />
          <meta
            id="twitter:description"
            name="twitter:description"
            content={seo.description}
          />
        </>
      )}
      {seo.keywords.length > 0 && (
        <meta id="keywords" name="keywords" content={keywords.join(',')} />
      )}
      {seo.image ? (
        <>
          <meta id="image" name="image" content={seo.image.src} />
          <meta id="og:image" property="og:image" content={seo.image.src} />
          <meta
            id="og:image:width"
            property="og:image:width"
            content={String(seo.image.width)}
          />
          <meta
            id="og:image:height"
            property="og:image:height"
            content={String(seo.image.height)}
          />
          <meta
            id="twitter:card"
            name="twitter:card"
            content="summary_large_image"
          />
          <meta
            id="twitter:image"
            name="twitter:image"
            content={String(seo.image.src)}
          />
        </>
      ) : (
        <meta id="twitter:card" name="twitter:card" content="summary" />
      )}
      {seo.twitterUsername && (
        <meta
          id="twitter:creator"
          name="twitter:creator"
          content={seo.twitterUsername}
        />
      )}
      {seo.author && <meta id="author" name="author" content={seo.author} />}
      {seo.canonical && (
        <>
          <meta id="og:url" property="og:url" content={seo.canonical} />
          <link id="canonical" rel="canonical" href={seo.canonical} />
        </>
      )}
      {children}
    </>
  );
};

/**
 * Page SEO component.
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
  return (
    <BaseSeo {...props} siteMetadata={siteMetadata}>
      {props.children}
    </BaseSeo>
  );
};
