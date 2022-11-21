import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';

import { links } from '@/config';

// components
import {
  Layout,
  Seo,
  CodeBlock,
  CodeTabs,
  CodePanel,
  AutoLinkH2,
  AutoLinkH3,
  Note,
  CodeNote,
  Icon,
  StyledLink,
} from '@/components';

// types
import type { PostNode, BlogPost } from '@/types';

type DataProps = {
  allFile: {
    edges: [
      {
        node: BlogPost;
      }
    ];
  };
};

type PageContext = {
  id: string;
  next: PostNode | null;
  previous: PostNode | null;
};

const shortcodes = {
  pre: CodeBlock,
  CodeTabs,
  CodePanel,
  h2: AutoLinkH2,
  h3: AutoLinkH3,
  Note,
  CodeNote,
  AutoLinkH2,
  AutoLinkH3,
};

/**
 * Custom link for blog posts
 */
const BlogLink: React.FC<{ to: string; className: string }> = ({
  to,
  className = '',
  children,
}) => (
  <StyledLink
    to={to}
    className={`text-lg inline-block text-slate-600 dark:text-slate-300 group ${className}`}
  >
    {children}
  </StyledLink>
);

const BlogPostTemplate = ({
  data,
  pageContext,
}: PageProps<DataProps, PageContext>) => {
  const node = data.allFile.edges[0].node.childMdx;
  const { next, previous } = pageContext;

  const image =
    node.frontmatter.featured_image?.childImageSharp?.gatsbyImageData;

  let src = node.frontmatter.featured_image?.childImageSharp.original.src;
  let height = node.frontmatter.featured_image?.childImageSharp.original.height;
  let width = node.frontmatter.featured_image?.childImageSharp.original.width;

  let seoImage = src && height && width ? { src, height, width } : undefined;

  const editLink = `${links.github}/v1/edit/main/content/blog/${node.slug.slice(
    0,
    -1
  )}/index.mdx`;

  return (
    <Layout blogPost>
      <Seo
        title={`${node.frontmatter.title} | Jon Rutter`}
        pathname={`/blog/${node.slug}`}
        article
        author="Jon Rutter"
        description={node.frontmatter.excerpt}
        image={seoImage}
      />
      <div className="bg-white dark:bg-slate-900">
        <div className="py-12 sm:py-16 md:py-20 px-6 md:px-12 bg-inherit text-inherit">
          <article className="w-full max-w-xl md:max-w-screen-md mx-auto">
            <header className="mb-10 sm:mb-12 md:mb-16">
              <div className="mb-8 lg:mb-12">
                <BlogLink to="/blog" className="-ml-2">
                  <span className="group-hover:animate-arrow inline-block px-2">
                    ←
                  </span>
                  All posts
                </BlogLink>
              </div>
              <h1 className="transition-all font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-white mb-3 md:mb-6 md:leading-[1.1] lg:leading-[1.1]">
                {node.frontmatter.title}
              </h1>
              <p className="text-base md:text-lg font-normal mt-0 space-x-4 flex mb-6 md:mb-8">
                <time dateTime={node.frontmatter.date}>
                  {format(parseISO(node.frontmatter.date), 'MMMM d, yyyy')}
                </time>{' '}
                <span>•</span> <span>{node.timeToRead} minute read</span>
              </p>
              {image && (
                <figure>
                  <GatsbyImage
                    image={image}
                    alt={node.frontmatter.featured_image_alt || ''}
                    className="select-none pointer-events-none dark:opacity-80"
                    imgClassName="select-none pointer-events-none dark:opacity-80 rounded-lg"
                  />
                  <figcaption className="italic mt-3 lg:px-6">
                    Image credit:{' '}
                    <a
                      href={node.frontmatter.featured_image_link}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      {node.frontmatter.featured_image_credit}
                    </a>
                  </figcaption>
                </figure>
              )}
            </header>
            <div className="prose md:prose-lg prose-slate mx-auto dark:prose-invert">
              <MDXProvider components={shortcodes}>
                <MDXRenderer>{node.body}</MDXRenderer>
              </MDXProvider>
              <hr />
            </div>

            <footer className="pb-4 md:pb-8 mx-auto max-w-prose md:text-lg">
              <div className="flex flex-col items-start sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 sm:items-center flex-wrap not-prose py-8">
                <StyledLink
                  as="a"
                  href={`https://twitter.com/intent/tweet?url=https://www.jonrutter.io/blog/${node.slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Tweet this post
                </StyledLink>
                <span className="hidden sm:inline text-slate-600 dark:text-slate-300">
                  •
                </span>
                <StyledLink
                  as="a"
                  href={editLink}
                  className="inline-flex items-center"
                  target="_blank"
                  rel="noreferrer"
                >
                  Edit on GitHub <Icon name="github" className="ml-1" />
                </StyledLink>
              </div>
              <hr className="border-t border-t-slate-200 dark:border-t-slate-700" />

              <div className="flex flex-col space-y-8 pt-8">
                {previous && (
                  <div className="self-start">
                    <BlogLink
                      to={`/blog/${previous.childMdx.slug}`}
                      className="-ml-2"
                    >
                      <span className="group-hover:animate-arrow inline-block px-2">
                        ←
                      </span>
                      {previous.childMdx.frontmatter.title}
                    </BlogLink>
                  </div>
                )}
                {next && (
                  <div className="self-end">
                    <BlogLink
                      to={`/blog/${next.childMdx.slug}`}
                      className="-mr-2"
                    >
                      {next.childMdx.frontmatter.title}{' '}
                      <span className="group-hover:animate-arrow inline-block px-2">
                        →
                      </span>
                    </BlogLink>
                  </div>
                )}
              </div>
            </footer>
          </article>
        </div>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($id: String) {
    allFile(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          childMdx {
            id
            slug
            timeToRead
            body
            frontmatter {
              date
              title
              excerpt
              featured_image_link
              featured_image_credit
              featured_image_alt
              featured_image {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED)
                  original {
                    src
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default BlogPostTemplate;
