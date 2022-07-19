import React, { useMemo, useState } from 'react';
import { graphql, PageProps } from 'gatsby';

// components
import { Layout, Seo, CTABox, Hero, BlogCard, Section } from '@/components';

// types
import type { BlogPostPreview } from '@/types';
import clsx from 'clsx';

type DataProps = {
  allMdx: {
    nodes: BlogPostPreview[];
  };
};

type Topics = {
  [index: string]: number;
};

const BlogPage = ({ data: { allMdx } }: PageProps<DataProps>) => {
  const [posts, setPosts] = useState<BlogPostPreview[]>(allMdx.nodes);
  const [active, setActive] = useState<string | null>(null);
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

  const handleTopicClick = (topic: string) => {
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
    <Layout withCTA>
      <Seo title="Blog | Jon Rutter" pathname="/blog" />
      <Hero
        short
        title="My blog"
        subtitle="Thoughts, opinions, and tutorials on web development"
      />
      <div className="bg-slate-50 dark:bg-slate-800">
        <Section as="div">
          <span className="block mb-4 font-heading font-black text-xl">
            Filter by topic
          </span>
          <div className="flex flex-wrap -ml-4 -mt-4 mb-8 md:mb-12">
            {topics.map((topic) => (
              <div className="ml-4 mt-4 text-base md:text-lg" key={topic}>
                <button
                  aria-label={`Filter posts by topic ${topic}`}
                  aria-pressed={active === topic}
                  onClick={() => handleTopicClick(topic)}
                  className={clsx(
                    'rounded-lg transition-all border-2 py-1 px-2 md:py-2 md:px-4 shadow-lg outline-none ring-slate-900 ring-offset-white dark:ring-white dark:ring-offset-slate-900 ring-0 ring-offset-0 focus:ring-2 focus:ring-offset-2',
                    active === topic
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white hover:bg-slate-700 dark:hover:bg-slate-200'
                      : 'border-slate-600 dark:border-slate-200 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 bg-white dark:bg-slate-900'
                  )}
                >
                  {topic}
                </button>
              </div>
            ))}
          </div>
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
