import type { GatsbyNode } from 'gatsby';
import path from 'path';
import readingTime from 'reading-time';

// types
import type { PostNode } from '@/types';

type PostEdge = {
  node: {
    id: string;
    frontmatter: {
      slug: string;
    };
    internal: {
      contentFilePath: string;
    };
  };
  next: PostNode | null;
  previous: PostNode | null;
};

type Data = {
  allMdx: {
    edges: PostEdge[];
  };
};

// add reading time to nodes
export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'Mdx') {
    createNodeField({
      node,
      name: 'timeToRead',
      value: readingTime(node.body as string),
    });
  }
};

// blog post template path
const blogTemplate = path.resolve(`./src/templates/blog-post.tsx`);

// generate pages for blog posts
export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions: { createPage },
  reporter,
}) => {
  // query for post archive
  const results = await graphql<Data>(`
    query {
      allMdx(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            id
            internal {
              contentFilePath
            }
            frontmatter {
              slug
            }
          }
          next {
            frontmatter {
              title
              slug
            }
          }
          previous {
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }
  `);

  if (results.errors) {
    reporter.panicOnBuild(`Error running GraphQL query.`);
    return;
  }

  const posts = results.data?.allMdx.edges;

  if (posts) {
    posts.forEach(({ node, next, previous }) => {
      reporter.log(`Building node: ${node.frontmatter.slug}`);

      createPage({
        path: `/blog/${node.frontmatter.slug}`,
        component: `${blogTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
        context: { id: node.id, next, previous },
      });
    });
  }
};
