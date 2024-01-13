/* eslint-disable jsx-a11y/anchor-is-valid */
import { useAtom } from 'jotai';
import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import {
  useQuery
} from '@tanstack/react-query';
import { sendQuery } from '../globalFuncs';
import { userAtom } from '../layout';
import CustomTable from '../reusable/CustomTable';
import './dataTable.css';
import UsersRow from './UsersRow';

const UsersTable = () => {
  const [user] = useAtom(userAtom);
  const { isLoading, error, data, refetch, isError } = useQuery(['fetchUsers'], async () => {
    if (user.email) {
      const myQuery = `
          query GetRecentUsers($email: String!) {
            getRecentUsers(email: $email) {
              _id
              name
              email
              admin
            }
          }
      `;
      const results = await sendQuery(myQuery, { email: user.email });
      return results.data ? results.data : null;
    }
    return null;
  }, []);
  if (isLoading) {
    return (
      <div className="w-100 h-100vh d-flex center column m-0">
        <HashLoader color="#ea2c58" background="white" size={90} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-100 h-100vh d-flex center column linear-bg m-0">
        <h1 className="text-pink-500">Error</h1>
        <span className="text-base">{error?.message || 'No data was received'}</span>
      </div>
    );
  }
  return (
    <CustomTable title="Users" columns={['Name', 'email', 'Change Role']} refreshList={() => refetch()}>
      {data && data.getRecentUsers ? (
        <>
          {data.getRecentUsers.map((key) => (
            <UsersRow key={key._id} name={key.name} email={key.email} id={key._id} />
          ))}
        </>
      ) : null}
    </CustomTable>
  );
};

export default () => (
  <UsersTable />
);
