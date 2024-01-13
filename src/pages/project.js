import { navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import Project from '../components/projectdetails/Project';
import Seo from '../components/seo';

const isBrowser = typeof window !== 'undefined';

const ProjectPage = () => {
  const [currentProject, setCurrentProject] = useState(null);
  useEffect(() => {
    if (isBrowser) {
      const url = new URL(window.location.href);
      url.searchParams.get('projectId') === null ? navigate('/projects') : null;
      if (url.searchParams.get('projectId') !== null) {
        setCurrentProject({ id: url.searchParams.get('projectId') });
      }
    }
  }, []);
  return (
    <Layout>
      <Seo title="Project" />
      <Project currentProject={currentProject} />
    </Layout>
  );
};

export default ProjectPage;
