import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Projects from '../components/projects/Projects';

const ProjectsPage = () => {
  return (
    <Layout>
      <Seo title="Projects" />
      <Projects />
    </Layout>
  );
};

export default ProjectsPage;
