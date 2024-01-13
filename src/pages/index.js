import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';
import NavBar from '../components/navbar/NavBar';
import IntroHeader from '../components/intro-header/IntroHeader';

const Home = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <NavBar />
      <IntroHeader />
    </Layout>
  );
};

export default Home;
