import React from 'react';
import Layout from '../components/layout';
import PageNotFound from '../components/pageNotFound/PageNotFound';
import Seo from '../components/seo';

const PageNotFoundPage = () => {
  return (
    <Layout>
      <Seo title="404" />
      <PageNotFound />
    </Layout>
  );
};

export default PageNotFoundPage;
