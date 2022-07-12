import React, { useState, useMemo } from 'react';
import { graphql, PageProps } from 'gatsby';

// components
import {
  Layout,
  Seo,
  PortfolioHero,
  PortfolioCard,
  Section,
  PortfolioTabs,
  PortfolioTabPanel,
  CTABox,
  PrimaryButton,
} from '@/components';

// types
import { PortfolioItemType } from '@/types';

type DataProps = {
  allPortfolioItemsJson: {
    nodes: PortfolioItemType[];
  };
};

const useCreatePortfolio = (list: PortfolioItemType[], expanded: boolean) => {
  return useMemo(() => {
    return list
      .slice(0, expanded ? undefined : 4)
      .map((item, index) => (
        <PortfolioCard item={item} key={item.id} reversed={index % 2 !== 0} />
      ));
  }, [list, expanded]);
};

const PortfolioPage = ({
  data: { allPortfolioItemsJson },
}: PageProps<DataProps>) => {
  const [expanded, setExpanded] = useState(false);

  const websiteItems = useMemo(
    () => allPortfolioItemsJson.nodes.filter((node) => node.type === 'website'),
    [allPortfolioItemsJson]
  );

  const appItems = useMemo(
    () => allPortfolioItemsJson.nodes.filter((node) => node.type === 'app'),
    [allPortfolioItemsJson]
  );

  const websiteContent = useCreatePortfolio(websiteItems, expanded);
  const appContent = useCreatePortfolio(appItems, expanded);

  return (
    <Layout withCTA>
      <Seo title="Jon Rutter | Web Developer" pathname="/portfolio" />
      <PortfolioHero />
      <div className="bg-slate-50 dark:bg-slate-800">
        <Section>
          <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl mb-8 md:mb-10 lg:mb-12 text-center text-slate-900 dark:text-slate-50">
            My portfolio
          </h2>
          <PortfolioTabs>
            <PortfolioTabPanel>
              <div className="mb-12 flex flex-col items-center space-y-8 md:space-y-12 lg:space-y-20">
                {websiteContent}
              </div>
            </PortfolioTabPanel>
            <PortfolioTabPanel>
              <div className="mb-12 flex flex-col items-center space-y-8 md:space-y-12 lg:space-y-20">
                {appContent}
              </div>
            </PortfolioTabPanel>
          </PortfolioTabs>
          <div className="flex items-center justify-center">
            <PrimaryButton
              as="button"
              onClick={() => setExpanded((expanded) => !expanded)}
            >
              {expanded ? 'See less' : 'See more'}
            </PrimaryButton>
          </div>
        </Section>
        <CTABox />
      </div>
    </Layout>
  );
};

export default PortfolioPage;

export const query = graphql`
  query {
    allPortfolioItemsJson {
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
  }
`;
