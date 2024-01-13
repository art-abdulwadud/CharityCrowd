import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { sendQuery } from '../../globalFuncs';
import { userAtom } from '../../layout';
import DonationsTable from './DonationsTable';

const DonationList = () => {
  const [user] = useAtom(userAtom);
  const { isLoading, isError, error, data } = useQuery(['fetchMyDonations'], async () => {
    try {
      const myQuery = `
            query GetDonationsByUserId($userid: String!) {
              getDonationsByUserId(userid: $userid) {
                _id
                amountDonated
                anonymous
                createdAt
                modeOfPayment
                projectId
              }
            }
          `;
      const results = await sendQuery(myQuery, { userid: user.id });
      return results.data?.getDonationsByUserId ? results.data.getDonationsByUserId : null;
    } catch (error) {
      throw error.message;
    }
  }, { enabled: !!user.id });
  return (
    <div className="w-100 flex center column" style={{ minHeight: '30vh' }}>
      {isLoading ? <HashLoader color="#ea2c58" background="white" size={90} /> : null}
      {isError ? (
        <>
          <h1 className="text-pink-500">Error</h1>
          <span className="text-base">{error?.message || 'No data was received'}</span>
        </>
      ) : null}
      {data ? <DonationsTable data={data} /> : null}
    </div>
  );
};

export default DonationList;
