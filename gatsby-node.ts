import type { GatsbyNode } from 'gatsby';
import path from 'path';

// types
import type { PostNode } from '@/types';

type PostEdge = {
  node: {
    id: string;
    childMdx: {
      slug: string;
    };
  };
  next: PostNode | null;
  previous: PostNode | null;
};

type Data = {
  allFile: {
    edges: PostEdge[];
  };
};

// generate pages for blog posts
export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions: { createPage },
  reporter,
}) => {
  // query for post archive
  const results = await graphql<Data>(`{
  allFile(
    filter: {sourceInstanceName: {eq: "blog"}, extension: {eq: "mdx"}}
    sort: {childrenMdx: {frontmatter: {date: DESC}}}
  ) {
    edges {
      node {
        id
        childMdx {
          slug
        }
      }
      next {
        childMdx {
          slug
          frontmatter {
            title
          }
        }
      }
      previous {
        childMdx {
          slug
          frontmatter {
            title
          }
        }
      }
    }
  }
}`);

  if (results.errors) {
    reporter.panicOnBuild(`Error running GraphQL query.`);
    return;
  }

  const posts = results.data?.allFile.edges;

  if (posts) {
    posts.forEach(({ node, next, previous }) => {
      reporter.log(`Building node: ${node.childMdx.slug}`);
      createPage({
        path: `/blog/${node.childMdx.slug}`,
        component: path.resolve(`./src/templates/blog-post.tsx`),
        context: { id: node.id, next, previous },
      });
    });
  }
};
