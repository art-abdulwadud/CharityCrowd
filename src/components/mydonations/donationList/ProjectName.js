import React, { useEffect, useState } from 'react';
import { sendQuery } from '../../globalFuncs';

const getProjectname = async (projectId) => {
  const myQuery = `
    query GetProjectById($projectid: ID!) {
      getProjectById(projectid: $projectid) {
        name
      }
    }
  `;
  const results = await sendQuery(myQuery, { projectid: projectId });
  return await results.data?.getProjectById?.name ? results.data.getProjectById.name : 'Project not found';
};

const ProjectName = ({ projectId }) => {
  const [projectname, setProjectname] = useState('Loading...');
  const settingProjectName = async () => {
    const username = await getProjectname(projectId);
    setProjectname(username);
  };
  useEffect(() => {
    if (projectId) settingProjectName();
    return () => null;
  }, [projectId]);
  return (
    <>{`${projectname.substring(0, 1).toUpperCase()}${projectname.substring(1)}`}</>
  );
};

export default ProjectName;
