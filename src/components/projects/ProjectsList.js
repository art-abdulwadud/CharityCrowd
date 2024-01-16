import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { sendQuery } from '../globalFuncs';
import ReactQueryPreloader from '../ReactQueryPreloader';
import SingleProject from './SingleProject';

const ProjectsList = () => {
  const { isLoading, data, error, isError } = useQuery(['fetchProjects'], async () => {
    const myQuery = `
      query GetAllProjects {
        getAllProjects {
          name
          _id
          userId
          requiredAmount
          currentAmount
          lastDonation {
            userId
            amount
            timestamp
            anonymous
          }
          description
        }
      }
    `;
    const results = await sendQuery(myQuery);
    if (results.data) return results.data;
    throw new Error(results.errors.message);
  }, { onError: (error) => console.log(error) });
  if (isLoading || isError) {
    return (<ReactQueryPreloader isError={isError} isLoading={isLoading} error={error} />);
  }
  return (
    <div className="grid grid-nogutter">
      {data && data.getAllProjects ? data.getAllProjects.map((key) => (
        <SingleProject key={key._id} project={{ ...key, id: key._id }} />
      )) : null}
    </div>
  );
};

export default ProjectsList;
