import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import HashLoader from 'react-spinners/HashLoader';
import { Chip } from 'primereact/chip';
import { useAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { sendQuery } from '../../globalFuncs';
import { userAtom } from '../../layout';
import RoleModalBtns from './RoleModalBtns';

const RoleModal = ({ toggle, modal, email, id, name }) => {
  const [user] = useAtom(userAtom);
  const { isLoading, error, data, refetch } = useQuery(['fetchUserRole'], async () => {
    if (user.email) {
      const myQuery = `
        query GetUserRole($currentUser: String!, $requestedUser: String!) {
          getUserRole(currentUser: $currentUser, requestedUser: $requestedUser) {
            admin
          }
        }
        `;
      const results = await sendQuery(myQuery, { currentUser: user.email, requestedUser: email });
      return results.data ? results.data : null;
    }
    return null;
  }, [email]);
  if (isLoading) {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="bg-pink-500 text-white">Change role</ModalHeader>
        <ModalBody>
          <div className="w-100 h-100 d-flex center column m-0">
            <HashLoader color="#ea2c58" background="white" size={90} />
          </div>
        </ModalBody>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="bg-pink-500 text-white">Change role</ModalHeader>
        <ModalBody>
          <div className="w-100 h-100 d-flex center column linear-bg m-0">
            <h1 className="text-pink-500">Error</h1>
            <span className="text-base">{error?.message || 'No data was received'}</span>
          </div>
        </ModalBody>
      </Modal>
    );
  }
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle} className="bg-pink-500 text-white">Change role</ModalHeader>
      <ModalBody>
        <h4><span className="capitalize">{name}</span>&apos;s role</h4>
        <Chip label={data.getUserRole.admin ? 'Admin User' : 'Normal User'} icon="pi pi-user" className="bg-pink-500 text-white ps-4 pe-4" />
      </ModalBody>
      <ModalFooter>
        <RoleModalBtns data={data} name={name} id={id} refetch={refetch} />
      </ModalFooter>
    </Modal>
  );
};

export default RoleModal;
