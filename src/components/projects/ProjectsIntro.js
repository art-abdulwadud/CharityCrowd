import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useAtom } from 'jotai';
import { userAtom } from '../layout';
import { showAddProjectModalAtom } from './Projects';

const ProjectsIntro = () => {
  const [, setModal] = useAtom(showAddProjectModalAtom);
  const [user] = useAtom(userAtom);
  return (
    <>
      <div className="surface-section px-4 py-5 md:px-6 lg:px-8">
        <div className="flex md:align-items-center md:justify-content-between flex-column md:flex-row pb-4 border-bottom-1 surface-border">
          <div className="mb-3 lg:mb-0">
            <div className="text-3xl font-medium text-900 mb-3">Projects</div>
            <div className="text-600 mr-0 md:mr-3">Here is where you'll find all the posted fundraisers</div>
            {user.admin ? (
              <Button
                label="Add new project"
                icon="pi pi-plus"
                className="text-sm bg-pink-500 border-pink-500 mt-3"
                onClick={() => setModal(true)}
              />
            ) : null}
          </div>
          <span className="p-input-icon-left w-full md:w-auto">
            <i className="pi pi-search" />
            <InputText placeholder="Search" className="w-full md:w-auto bx-none outline-none" />
          </span>
        </div>
      </div>
    </>
  );
};

export default ProjectsIntro;
