import type { GatsbyConfig } from 'gatsby';
import path from 'path';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Jon Rutter's Portfolio Website`,
    description: `I am a frontend developer specializing in building fast, user-focused websites with React.`,
    author: `Jon Rutter`,
    siteUrl: `https://www.jonrutter.io`,
    twitterUsername: `@rutterjt`,
    image: `./src/images/icon.png`,
    lang: `en`,
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: `Jon Rutter`,
        short_name: `Jon Rutter`,
        start_url: `/`,
        background_color: `#F8FAFC`,
        theme_color: `#F8FAFC`,
        display: `standalone`,
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1280,
              sizeByPixelDensity: true,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `blurred`,
          quality: 100,
          backgroundColor: `transparent`,
        },
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: './content/blog/',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'portfolio',
        path: './content/portfolio/',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'portfolioImages',
        path: './content/portfolio/images',
      },
    },
    'gatsby-plugin-postcss',
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-plugin-root-import`,
      options: {
        '@': path.join(__dirname, 'src'),
        '@content': path.join(__dirname, 'content'),
      },
    },
  ],
  trailingSlash: 'never',
};

export default config;
