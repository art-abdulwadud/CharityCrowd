/* eslint-disable max-statements */
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Button } from 'primereact/button';
import { Steps } from 'primereact/steps';
import HashLoader from 'react-spinners/HashLoader';
import { useAtom } from 'jotai';
import AddProjectForm from './AddProjectForm';
import { queryClient, userAtom } from '../../layout';
import { sendQuery } from '../../globalFuncs';

const AddProject = ({ modal, toggle }) => {
  const [user] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const defaultInputs = { name: '', description: '', requiredAmount: 0, organizer: { name: '', location: '', email: '' }, beneficiary: { name: '', location: '', email: '' } };
  const [inputs, setInputs] = useState(defaultInputs);
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }, { label: 'Step 4' }];
  const handleSubmit = async (ev) => {
    try {
      ev.preventDefault();
      setLoading(true);
      if (activeIndex === 3) {
        const myQuery = `
          query AddAProject($currentUser: String!, $project: ProjectInput!) {
            addAProject(currentUser: $currentUser, project: $project) {
              _id
            }
          }
          `;
        const newInputs = inputs;
        Object.entries(newInputs).forEach((key) => typeof key[1] === 'string' ? newInputs[key[0]] = key[1].toLowerCase() : null);
        Object.entries(newInputs.organizer).forEach((key) => typeof key[1] === 'string' ? newInputs.organizer[key[0]] = key[1].toLowerCase() : null);
        Object.entries(newInputs.beneficiary).forEach((key) => typeof key[1] === 'string' ? newInputs.beneficiary[key[0]] = key[1].toLowerCase() : null);
        const results = await sendQuery(myQuery, { currentUser: user.email, project: inputs });
        results.errors ? null : queryClient.invalidateQueries(['fetchProjects']);
      }
      activeIndex === 3 ? setActiveIndex(0) : setActiveIndex(activeIndex + 1);
      activeIndex === 3 ? setInputs(defaultInputs) : null;
      activeIndex === 3 ? toggle() : null;
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  if (loading) {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="bg-pink-500 text-white">Loading...</ModalHeader>
        <ModalBody>
          <div className="w-100 h-100 d-flex center column m-0">
            <HashLoader color="#ea2c58" background="white" size={90} />
          </div>
        </ModalBody>
      </Modal>
    );
  }
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle} className="bg-pink-500 text-white">Add Project</ModalHeader>
      <ModalBody>
        <Steps model={items} activeIndex={activeIndex} className="mb-3" />
        <form className="pt-5 pb-3" onSubmit={handleSubmit}>
          <AddProjectForm inputs={inputs} setInputs={setInputs} activeIndex={activeIndex} />
          <div className="w-100 text-right">
            {activeIndex === 0 ? null : (
              <Button
                label="Back"
                icon="pi pi-angle-left"
                className="text-sm  bg-white border-pink-500 mt-3 text-700 mr-2"
                type="button"
                onClick={() => setActiveIndex(activeIndex - 1)}
              />
            )}
            <Button
              loading={loading}
              label={activeIndex === 3 ? 'Add Project' : 'Continue'}
              className="text-sm bg-pink-500 border-pink-500 mt-3"
              type="submit"
            />
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default AddProject;
