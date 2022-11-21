import React, { useMemo, useState } from 'react';
import { graphql, PageProps } from 'gatsby';
import clsx from 'clsx';

// components
import { Layout, Seo, Hero, BlogCard, Section } from '@/components';

// types
import type { BlogPostPreview } from '@/types';

type DataProps = {
  allMdx: {
    nodes: BlogPostPreview[];
  };
};

type Topics = {
  [index: string]: number;
};

/* ~~~ Push button ~~~ */
interface PushButtonProps
  extends React.PropsWithChildren<React.ComponentPropsWithoutRef<'button'>> {
  pressed: boolean;
}

const PushButton: React.FC<PushButtonProps> = ({
  pressed,
  onClick,
  children,
}) => (
  <button
    aria-pressed={pressed}
    onClick={onClick}
    className={clsx(
      'rounded-full transition-all border-2 py-1 px-3 md:py-2 md:px-4 shadow-md outline-none ring-slate-900 ring-offset-white dark:ring-white dark:ring-offset-slate-800 ring-0 ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-2 text-base font-heading font-medium',
      pressed
        ? 'bg-sky-700 dark:bg-sky-50 text-white dark:text-slate-900 border-sky-700 dark:border-sky-50'
        : 'border-sky-700 dark:border-white text-sky-700 dark:text-white bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-900'
    )}
  >
    {children}
  </button>
);

const BlogPage = ({ data: { allMdx } }: PageProps<DataProps>) => {
  const [posts, setPosts] = useState<BlogPostPreview[]>(allMdx.nodes);
  const [active, setActive] = useState<string | null>(null);

  // generates a memoized list of post topics
  const topics = useMemo<string[]>(() => {
    console.log('Filtering topics');
    let topicObj: Topics = {};
    allMdx.nodes.forEach((post) => {
      if (Array.isArray(post.frontmatter.topics)) {
        for (let topic of post.frontmatter.topics) {
          if (topic in topicObj) {
            topicObj[topic] += 1;
          } else {
            topicObj[topic] = 1;
          }
        }
      }
    });
    return Object.keys(topicObj).sort((a, b) => topicObj[b] - topicObj[a]);
  }, [allMdx.nodes]);

  /**
   * Filters all posts by the specified topic, or, if the topic is already selected, unfilter the topics.
   */
  const filterByTopic = (topic: string) => {
    if (active === topic) {
      setActive(null);
      setPosts(allMdx.nodes);
    } else {
      setActive(topic);
      setPosts(
        allMdx.nodes.filter(
          ({ frontmatter: { topics } }) => topics && topics.includes(topic)
        )
      );
    }
  };

  return (
    <Layout>
      <Seo title="Blog | Jon Rutter" pathname="/blog" />
      <Hero title="My blog">
        <p className="mb-8">
          Articles sharing my thoughts, opinions, and tutorials on web
          development.
        </p>
        <div>
          <span className="block mb-4 font-heading font-black text-xl text-slate-800 dark:text-slate-50">
            Filter by topic
          </span>
          <div className="flex flex-wrap -ml-4 -mt-4">
            {topics.map((topic) => (
              <div className="ml-4 mt-4 text-base md:text-lg" key={topic}>
                <PushButton
                  aria-label={`Filter posts by topic ${topic}`}
                  onClick={() => filterByTopic(topic)}
                  pressed={active === topic}
                >
                  {topic}
                </PushButton>
              </div>
            ))}
          </div>
        </div>
      </Hero>
      <div className="bg-slate-100 dark:bg-slate-900">
        <Section as="div">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {posts.length > 0 ? (
              posts.map((item, index) => (
                <div key={index}>
                  <BlogCard item={item} />
                </div>
              ))
            ) : (
              <p className="text-xl">Sorry, no posts were found.</p>
            )}
          </div>
        </Section>
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
          date
          featured_image {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, width: 650)
            }
          }
          topics
        }
      }
    }
  }
`;
