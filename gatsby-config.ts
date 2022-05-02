import type { GatsbyConfig } from 'gatsby';

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
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
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
        name: 'pages',
        path: './src/pages/',
      },
    },

    'gatsby-plugin-postcss',
  ],
};

export default config;
