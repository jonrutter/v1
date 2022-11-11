import React from 'react';
import { graphql, PageProps } from 'gatsby';

// components
import {
  Layout,
  Seo,
  Hero,
  PortfolioCard,
  BlogCard,
  Section,
  PrimaryButton,
  SecondaryButton,
} from '@/components';

// types
import { PortfolioItemType, BlogPostPreview } from '@/types';

type DataProps = {
  allPortfolioItemsJson: {
    nodes: PortfolioItemType[];
  };
  allMdx: {
    nodes: BlogPostPreview[];
  };
};

const IndexPage = ({
  data: { allPortfolioItemsJson, allMdx },
}: PageProps<DataProps>) => {
  return (
    <Layout>
      <Seo title="Jon Rutter | Web Developer" pathname="/" />
      <Hero
        title={
          <>
            <div>Building websites </div>
            <div>that shine</div>
          </>
        }
      >
        <p className="mb-4">
          Hi! I'm Jon: a front-end web developer specializing in building fast,
          accessible, and responsive websites with React.
        </p>
        <p className="mb-4">
          I'm passionate about building great websites for my clients,
          contributing to open source projects, and expanding my knowledge about
          web and software development.
        </p>
        <div className="text-center md:text-left mt-8 md:mt-8 flex flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0 sm:space-x-8">
          <PrimaryButton to="/contact" className="w-full sm:w-auto">
            Contact me
          </PrimaryButton>
          <SecondaryButton to="/portfolio" className="w-full sm:w-auto">
            My portfolio
          </SecondaryButton>
        </div>
      </Hero>
      <div className="bg-slate-100 dark:bg-slate-900">
        <Section>
          <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl mb-8 md:mb-10 lg:mb-12 text-center text-slate-900 dark:text-slate-50">
            Recent projects
          </h2>
          <div className="space-y-8 md:space-y-10 lg:space-y-14">
            {allPortfolioItemsJson.nodes.map((item, index) => (
              <PortfolioCard
                item={item}
                key={item.id}
                reversed={index % 2 !== 0}
              />
            ))}
            <div className="text-center">
              <PrimaryButton to="/portfolio">Full portfolio</PrimaryButton>
            </div>
          </div>
        </Section>
        <Section>
          <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl mb-8 md:mb-10 lg:mb-12 text-center text-slate-900 dark:text-slate-50">
            Recent blog posts
          </h2>
          <div className="space-y-8 md:space-y-10 lg:flex lg:space-y-0 lg:space-x-6 mb-8 md:mb-10 lg:mb-44">
            {allMdx.nodes.map((item, index) => (
              <div
                key={index}
                className={
                  index === 1
                    ? 'w-full lg:translate-y-12'
                    : index === 2
                    ? `w-full lg:translate-y-24`
                    : `w-full`
                }
              >
                <BlogCard item={item} />
              </div>
            ))}
          </div>
          <div className="text-center">
            <PrimaryButton to="/blog">More posts</PrimaryButton>
          </div>
        </Section>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    allPortfolioItemsJson(filter: { featured: { eq: true } }) {
      nodes {
        title
        description
        url
        code
        type
        featured
        skills {
          label
          icon
          color
          href
        }
        tools {
          label
          icon
          color
        }
        id
        featuredImage {
          src {
            childImageSharp {
              gatsbyImageData(width: 1200, placeholder: BLURRED)
            }
          }
        }
      }
    }
    allMdx(limit: 3, sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        id
        slug
        timeToRead
        frontmatter {
          title
          excerpt
          date
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
