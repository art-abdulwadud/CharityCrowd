import { atom, useAtom } from 'jotai';
import React from 'react';
import { userAtom } from '../layout';
import NavBar from '../navbar/NavBar';
import Sidebar from '../sidebar/Sidebar';
import ProjectsIntro from './ProjectsIntro';
import ProjectsList from './ProjectsList';
import AddProject from './forms/AddProject';

export const showAddProjectModalAtom = atom(false);
export const editingProjectAtom = atom(false);
export const selectedProjectAtom = atom(null);

const Projects = () => {
  const [user] = useAtom(userAtom);
  const [modal, setModal] = useAtom(showAddProjectModalAtom);
  return (
    <>
      {user.id ? (
        <Sidebar>
          {user.admin ? <AddProject modal={modal} toggle={() => setModal(!modal)} /> : null}
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
