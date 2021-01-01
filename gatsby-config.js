require('dotenv').config({
  path: '.env',
});

module.exports = {
  siteMetadata: {
    title: 'James Acklin',
    description:
      'I’m a senior user experience designer with a programming background in Pittsburgh, USA.',
    author: '@jamesacklin',
  },
  plugins: [
    {
      resolve: 'gatsby-source-airtable',
      options: {
        apiKey: process.env.GATSBY_AIRTABLE_KEY,
        tables: [
          {
            baseId: 'app2yGcuEqoxi3bIH',
            tableName: 'Projects',
          },
          {
            baseId: 'app2yGcuEqoxi3bIH',
            tableName: 'Clients',
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#FFFFFF',
        theme_color: '#000000',
        display: 'minimal-ui',
        icon: `static/icons/icon-144x144.png`,
      },
    },
    // `gatsby-plugin-offline`,
  ],
};
