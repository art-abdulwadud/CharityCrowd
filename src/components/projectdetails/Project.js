import { atom, useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { userAtom } from '../layout';
import NavBar from '../navbar/NavBar';
import Sidebar from '../sidebar/Sidebar';
import ProjectDetails from './ProjectDetails';

export const donationInputsAtom = atom({});
export const searchProjectAtom = atom('');
export const projectsFilteredAtom = atom([]);

const Project = ({ currentProject }) => {
  const [user] = useAtom(userAtom);
  const [donationInputs, setDonationInputs] = useAtom(donationInputsAtom);
  useEffect(() => {
    setDonationInputs({ payment: {}, anonymous: false, subscribed: currentProject.subscribed || false });
    return () => setDonationInputs({ payment: {}, anonymous: false, subscribed: currentProject.subscribed || false });
  }, []);
  return (
    <>
      {user.id ? (
        <Sidebar>
          {currentProject ? (
            <ProjectDetails projectId={currentProject.id} inputs={donationInputs} setInputs={setDonationInputs} currentProject={currentProject} />
          ) : null}
        </Sidebar>
      ) : (
        <>
          <NavBar />
          {currentProject ? (
            <ProjectDetails projectId={currentProject.id} inputs={donationInputs} setInputs={setDonationInputs} />
          ) : null}
        </>
      )}
    </>
  );
};

export default Project;
