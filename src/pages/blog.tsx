import React, { useMemo, useState } from 'react';
import { graphql, PageProps } from 'gatsby';

// components
import {
  Layout,
  Seo,
  CTABox,
  Hero,
  BlogCard,
  Section,
  PushButton,
} from '@/components';

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
          <div className="flex flex-wrap -ml-4 -mt-4 mb-12 md:mb-16">
            {topics.map((topic) => (
              <div className="ml-4 mt-4 text-base md:text-lg" key={topic}>
                <PushButton
                  aria-label={`Filter posts by topic ${topic}`}
                  onClick={() => handleTopicClick(topic)}
                  pressed={active === topic}
                >
                  {topic}
                </PushButton>
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
