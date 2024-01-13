import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import HashLoader from 'react-spinners/HashLoader';
import React from 'react';
import { sendQuery } from '../../globalFuncs';
import { userAtom } from '../../layout';
import ProjectsSubscribedTable from './ProjectsSubscribedTable';

const ProjectsSubscribed = () => {
  const [user] = useAtom(userAtom);
  const { isLoading, isError, error, data } = useQuery(['fetchProjectsSubscribed'], async () => {
    try {
      const myQuery = `
      query GetUserProfile($userid: String!) {
        getUserProfile(userid: $userid) {
          subscriptions
        }
      }
          `;
      const results = await sendQuery(myQuery, { userid: user.id });
      if (results.data?.getUserProfile?.subscriptions) {
        const arr = [];
        results.data.getUserProfile.subscriptions?.forEach((key) => arr.push({ projectId: key[0], amount: key[1] }));
        return arr;
      }
      return null;
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
      {data ? <ProjectsSubscribedTable data={data} /> : null}
    </div>
  );
};

export default ProjectsSubscribed;
