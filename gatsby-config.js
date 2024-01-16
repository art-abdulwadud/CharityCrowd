require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: 'CharityCrowd',
    description: 'A simple app for funding crucial projects',
    author: '@art-abdulwadud',
    siteUrl: 'https://gatsbystarterdefaultsource.gatsbyjs.io/'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'CharityCrowd',
        short_name: 'fund-raiser',
        start_url: '/',
        background_color: '#e91e63',
        theme_color: '#e91e63',
        display: 'standalone',
        icon: 'static/favicon.webp'
      }
    },
    {
      resolve: 'gatsby-plugin-firebase',
      options: {
        credentials: {
          apiKey: process.env.GATSBY_apiKey,
          authDomain: process.env.GATSBY_authDomain,
          projectId: process.env.GATSBY_projectId,
          storageBucket: process.env.GATSBY_storageBucket,
          messagingSenderId: process.env.GATSBY_messagingSenderId,
          appId: process.env.GATSBY_appId,
          measurementId: process.env.GATSBY_measurementId
        }
      }
    }
  ]
};
