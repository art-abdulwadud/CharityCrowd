import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

const Seo = ({ title }) => {
  const { site } = useStaticQuery(
    graphql`
          query {
            site {
              siteMetadata {
                title
                description
                author
              }
            }
          }
        `
  );

  const metaDescription = site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;
  return (
    <Helmet>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ''} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
    </Helmet>
  );
};

export default Seo;
