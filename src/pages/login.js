import React from 'react';
import LoginWrapper from '../components/auth/login/LoginWrapper';
import Layout from '../components/layout';
import NavBar from '../components/navbar/NavBar';
import Seo from '../components/seo';

const LoginPage = () => {
  return (
    <Layout>
      <Seo title="Sign In" />
      <NavBar />
      <LoginWrapper />
    </Layout>
  );
};

export default LoginPage;
