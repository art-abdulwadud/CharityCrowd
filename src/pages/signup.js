import React from 'react';
import SignUpWrapper from '../components/auth/signup/SignUpWrapper';
import Layout from '../components/layout';
import NavBar from '../components/navbar/NavBar';
import Seo from '../components/seo';

const SignUpPage = () => {
  return (
    <Layout>
      <Seo title="Sign Up" />
      <NavBar />
      <SignUpWrapper />
    </Layout>
  );
};

export default SignUpPage;
