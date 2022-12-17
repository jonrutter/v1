import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { MDXProvider } from '@mdx-js/react';
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
import type { PostNode, BlogNode } from '@/types';

type DataProps = {
  allMdx: {
    edges: [
      {
        node: BlogNode;
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

type BlogLinkProps = {
  to: string;
  className: string;
  children: React.ReactNode;
};

/**
 * Custom link for blog posts
 */
const BlogLink: React.FC<BlogLinkProps> = ({
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
  children,
}: PageProps<DataProps, PageContext>) => {
  const node = data.allMdx.edges[0].node;
  const { next, previous } = pageContext;

  const image =
    node.frontmatter.featured_image?.childImageSharp?.gatsbyImageData;

  const editLink = `${links.github}/v1/edit/main/content/blog/${node.frontmatter.slug}/index.mdx`;

  return (
    <Layout blogPost>
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
                <span>•</span> <span>{node.fields.timeToRead.text}</span>
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
              <MDXProvider components={shortcodes}>{children}</MDXProvider>
              <hr />
            </div>

            <footer className="pb-4 md:pb-8 mx-auto max-w-prose md:text-lg">
              <div className="flex flex-col items-start sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 sm:items-center flex-wrap not-prose py-8">
                <StyledLink
                  as="a"
                  href={`https://twitter.com/intent/tweet?url=https://www.jonrutter.io/blog/${node.frontmatter.slug}`}
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
                      to={`/blog/${previous.frontmatter.slug}`}
                      className="-ml-2"
                    >
                      <span className="group-hover:animate-arrow inline-block px-2">
                        ←
                      </span>
                      {previous.frontmatter.title}
                    </BlogLink>
                  </div>
                )}
                {next && (
                  <div className="self-end">
                    <BlogLink
                      to={`/blog/${next.frontmatter.slug}`}
                      className="-mr-2"
                    >
                      {next.frontmatter.title}{' '}
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
  query BlogPostTemplate($id: String) {
    allMdx(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          fields {
            timeToRead {
              text
            }
          }
          body
          frontmatter {
            slug
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
`;

export default BlogPostTemplate;

export const Head = ({ data }: PageProps<DataProps>) => {
  const node = data.allMdx.edges[0].node;

  let src = node.frontmatter.featured_image?.childImageSharp.original.src;
  let height = node.frontmatter.featured_image?.childImageSharp.original.height;
  let width = node.frontmatter.featured_image?.childImageSharp.original.width;

  let seoImage = src && height && width ? { src, height, width } : undefined;

  return (
    <Seo
      title={`${node.frontmatter.title} | Jon Rutter`}
      pathname={`/blog/${node.frontmatter.slug}`}
      article
      author="Jon Rutter"
      description={node.frontmatter.excerpt}
      image={seoImage}
    />
  );
};
