import { useQuery } from '@tanstack/react-query';
import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { sendQuery } from '../../globalFuncs';
import SingleDonation from './SingleDonation';

const DonationModal = ({ toggle, projectId }) => {
  const url = new URL(window.location.href);
  const { isLoading, data, error, isError } = useQuery(['fetchProjectDonations'], async () => {
    const myQuery = `
      query GetDonationsByProjectId($projectid: String!) {
        getDonationsByProjectId(projectid: $projectid) {
          userId
          projectId
          amountDonated
          anonymous
          _id
          createdAt
        }
      }
    `;
    const results = await sendQuery(myQuery, { projectid: projectId });
    if (results.errors) throw new Error(results.errors[0].message);
    return results.data?.getDonationsByProjectId;
  }, { enabled: url.searchParams.get('displayDonations') === 'true' && !!projectId });
  return (
    <Modal isOpen={url.searchParams.get('displayDonations') === 'true'} toggle={toggle}>
      <ModalHeader toggle={toggle} className="bg-pink-500 text-white">List of donations</ModalHeader>
      <ModalBody>
        <div className="surface-card shadow-2 border-round p-4">
          {isLoading ? (
            <div className="w-100 d-flex center column m-0">
              <HashLoader color="#ea2c58" background="white" size={90} />
            </div>
          ) : isError ? (
            <div className="w-100 d-flex center column m-0">
              <div className="w-100 h-100 d-flex center column linear-bg m-0">
                <h1 className="text-pink-500">Error</h1>
                <span className="text-base">{error?.message || 'No data was received'}</span>
              </div>
            </div>
          ) : (
            <ul className="list-none p-0 m-0">
              {data?.map((key) => (
                <SingleDonation key={key._id} donation={key} />
              ))}
            </ul>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DonationModal;
