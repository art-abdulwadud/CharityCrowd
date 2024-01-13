import React from 'react';
import UsersTable from '../components/admin/UsersTable';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Sidebar from '../components/sidebar/Sidebar';

const administration = () => {
  return (
    <Layout>
      <Seo title="Administration" />
      <Sidebar>
        <UsersTable />
      </Sidebar>
    </Layout>
  );
};

export default administration;
