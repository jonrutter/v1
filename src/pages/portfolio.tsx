import React, { useState, useMemo } from 'react';
import { graphql, PageProps } from 'gatsby';
import clsx from 'clsx';

// components
import { Tab } from '@headlessui/react';
import {
  Layout,
  Seo,
  Hero,
  PortfolioCard,
  Section,
  Button,
} from '@/components';

// data
import { links } from '@/config';

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

const StyledTab: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Tab
    className={({ selected }) =>
      clsx(
        'px-4 py-2 outline-none border-none active:bg-transparent focus-visible:ring-2 ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:dark:ring-offset-slate-700 dark:ring-white rounded-xl font-heading font-medium',
        selected
          ? 'text-white bg-sky-700 dark:text-slate-700 dark:bg-slate-50'
          : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-50 hover:bg-sky-100 dark:hover:bg-slate-600'
      )
    }
  >
    {children}
  </Tab>
);

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
    <Layout>
      <Seo title="Jon Rutter | Web Developer" pathname="/portfolio" />
      <Hero title="My portfolio">
        <p className="mb-4">
          Here are some of my recent projects and client websites.
        </p>
        <p className="mb-4">
          Feel free to also check out my GitHub account to see more of my
          projects and open source contributions.
        </p>
        <div className="text-center md:text-left mt-8 md:mt-8 flex flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0 sm:space-x-8">
          <Button to="/contact" className="w-full sm:w-auto" variant="primary">
            Contact me
          </Button>
          <Button
            as="a"
            href={links.github}
            className="w-full sm:w-auto"
            variant="secondary"
          >
            My GitHub
          </Button>
        </div>
      </Hero>
      <div className="bg-slate-100 dark:bg-slate-900">
        <Section>
          <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl mb-8 md:mb-10 lg:mb-12 text-center text-slate-900 dark:text-white">
            My portfolio
          </h2>
          <Tab.Group>
            <div className="flex items-center justify-center mb-6 lg:mb-10">
              <Tab.List className="p-1 text-lg rounded-xl relative z-10 gap-1 grid grid-cols-2 overflow-hidden shadow-md bg-white text-slate-900 dark:bg-slate-700 dark:text-white">
                <StyledTab>Websites</StyledTab>
                <StyledTab>Apps</StyledTab>
              </Tab.List>
            </div>
            <Tab.Panels>
              <Tab.Panel>
                <div className="mb-12 flex flex-col items-center space-y-8 md:space-y-12 lg:space-y-20">
                  {websiteContent}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="mb-12 flex flex-col items-center space-y-8 md:space-y-12 lg:space-y-20">
                  {appContent}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          <div className="flex items-center justify-center">
            <Button
              as="button"
              onClick={() => setExpanded((expanded) => !expanded)}
              variant="primary"
            >
              {expanded ? 'See less' : 'See more'}
            </Button>
          </div>
        </Section>
      </div>
    </Layout>
  );
};

export default PortfolioPage;

// page query
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
