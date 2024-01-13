import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Sidebar from '../components/sidebar/Sidebar';
import Profile from '../components/profile/Profile';

const ProfilePage = () => {
  return (
    <Layout>
      <Seo title="Profile" />
      <Sidebar>
        <Profile />
      </Sidebar>
    </Layout>
  );
};

export default ProfilePage;
