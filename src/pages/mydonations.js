import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Sidebar from '../components/sidebar/Sidebar';
import MyDonations from '../components/mydonations/MyDonations';

const MyDonationsPage = () => {
  return (
    <Layout>
      <Seo title="My Donations" />
      <Sidebar>
        <MyDonations />
      </Sidebar>
    </Layout>
  );
};

export default MyDonationsPage;
