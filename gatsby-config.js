module.exports = {
  siteMetadata: {
    title: 'Basic Starter',
    description: 'A simple gatsby starter template',
    author: '@art-abdulwadud',
    siteUrl: 'https://gatsbystarterdefaultsource.gatsbyjs.io/'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-firebase',
      options: {
        credentials: {
          apiKey: 'AIzaSyDG8MM9UeWotBgZi9ArK04w00ipRsikvws',
          authDomain: 'titanium-constraction.firebaseapp.com',
          projectId: 'titanium-constraction',
          storageBucket: 'titanium-constraction.appspot.com',
          messagingSenderId: '696219662928',
          appId: '1:696219662928:web:eef2e9de886c9a372bef55',
          measurementId: 'G-V9GNZXLZDS'
        }
      }
    }
  ]
};
