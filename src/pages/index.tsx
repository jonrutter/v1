import React from 'react';
import { graphql, PageProps } from 'gatsby';

// components
import {
  Layout,
  Seo,
  HomeHero,
  CTABox,
  PortfolioCard,
  BlogCard,
  Section,
  PrimaryButton,
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
  console.log(allPortfolioItemsJson);
  return (
    <Layout withCTA>
      <Seo title="Jon Rutter | Web Developer" pathname="/" />
      <HomeHero />
      <div className="bg-slate-50 dark:bg-slate-800">
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
              <PrimaryButton to="/portfolio">See more</PrimaryButton>
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
            <PrimaryButton to="/blog">See more</PrimaryButton>
          </div>
        </Section>
        <CTABox />
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
