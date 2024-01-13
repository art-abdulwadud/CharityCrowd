import { useAtom } from 'jotai';
import React from 'react';
import { userAtom } from '../layout';
import NavBar from '../navbar/NavBar';
import Sidebar from '../sidebar/Sidebar';
import ProjectsIntro from './ProjectsIntro';
import ProjectsList from './ProjectsList';

const Projects = () => {
  const [user] = useAtom(userAtom);
  return (
    <>
      {user.id ? (
        <Sidebar>
          <ProjectsIntro />
          <ProjectsList />
        </Sidebar>
      ) : (
        <>
          <NavBar />
          <ProjectsIntro />
          <ProjectsList />
        </>
      )}
    </>
  );
};

export default Projects;
