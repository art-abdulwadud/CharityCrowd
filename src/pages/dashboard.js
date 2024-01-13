import React from 'react';
import DashboardHeading from '../components/dashboard/DashboardHeading';
import ProjectsSubscribed from '../components/dashboard/projectSubscribed/ProjectsSubscribed';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Sidebar from '../components/sidebar/Sidebar';

const DashboardPage = () => {
  return (
    <Layout>
      <Seo title="Dashboard" />
      <Sidebar>
        <DashboardHeading />
        <ProjectsSubscribed />
      </Sidebar>
    </Layout>
  );
};

export default DashboardPage;
