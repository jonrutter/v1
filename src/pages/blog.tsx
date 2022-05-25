import React from 'react';
import { graphql, PageProps } from 'gatsby';

// components
import { Layout, Seo, CTABox, Hero, BlogCard, Section } from '@/components';

// types
import type { BlogPostPreview } from '@/types';

type DataProps = {
  allMdx: {
    nodes: BlogPostPreview[];
  };
};

const BlogPage = ({ data: { allMdx } }: PageProps<DataProps>) => {
  return (
    <Layout withCTA>
      <Seo title="Blog | Jon Rutter" pathname="/blog" />
      <Hero
        short
        title="My blog"
        subtitle="Thoughts, opinions, and tutorials on web development"
      />
      <div className="bg-slate-50 dark:bg-slate-800">
        <Section as="div">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {allMdx.nodes.map((item, index) => (
              <div key={index}>
                <BlogCard item={item} />
              </div>
            ))}
          </div>
        </Section>
        <CTABox />
      </div>
    </Layout>
  );
};

export default BlogPage;

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        slug
        id
        timeToRead
        frontmatter {
          title
          excerpt
          date(formatString: "MMMM DD, YYYY")
          featured_image {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, width: 650)
            }
          }
        }
      }
    }
  }
`;
