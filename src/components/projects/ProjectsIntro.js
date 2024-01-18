import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useAtom } from 'jotai';
import { editingProjectAtom, showAddProjectModalAtom } from './Projects';
import { searchProjectAtom } from '../projectdetails/Project';

const ProjectsIntro = () => {
  const [, setModal] = useAtom(showAddProjectModalAtom);
  const [, setEditingProject] = useAtom(editingProjectAtom);
  const [, setSearchProject] = useAtom(searchProjectAtom);
  return (
    <>
      <div className="surface-section px-4 py-5 md:px-6 lg:px-8">
        <div className="flex md:align-items-center md:justify-content-between flex-column md:flex-row pb-4 border-bottom-1 surface-border">
          <div className="mb-3 lg:mb-0">
            <div className="text-3xl font-medium text-900 mb-3">Projects</div>
            <div className="text-600 mr-0 md:mr-3">Here is where you'll find all the posted fundraisers</div>
            <Button
              label="Add new project"
              icon="pi pi-plus"
              className="text-sm bg-pink-500 border-pink-500 mt-3"
              onClick={() => {
                setEditingProject(false);
                setModal(true);
              }}
            />
          </div>
          <span className="p-input-icon-left w-full md:w-auto">
            <i className="pi pi-search" />
            <InputText
              placeholder="Search project name"
              className="w-full md:w-auto bx-none outline-none"
              onChange={(e) => setSearchProject(e.target.value)}
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default ProjectsIntro;
