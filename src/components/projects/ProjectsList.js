import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useAtom } from 'jotai';
import { sendQuery } from '../globalFuncs';
import ReactQueryPreloader from '../ReactQueryPreloader';
import SingleProject from './SingleProject';
import { searchProjectAtom } from '../projectdetails/Project';

const ProjectsList = () => {
  const [searchProject] = useAtom(searchProjectAtom);
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
  const filteredProjects = data?.getAllProjects?.filter((key) => key.name.includes(searchProject)) || [];
  if (isLoading || isError) {
    return (<ReactQueryPreloader isError={isError} isLoading={isLoading} error={error} />);
  }
  return (
    <>
      {data?.getAllProjects && searchProject?.length > 2 ? (
        <h1 className="p-2 text-pink-500 text-2xl">
          {filteredProjects.length === 0 ? 'No results found'
            : filteredProjects.length === 1 ? 'Found 1 item'
              : `Found ${filteredProjects.length} items`}
        </h1>
      ) : null}
      <div className="grid p-2">
        {data?.getAllProjects && searchProject?.length < 3 ? data.getAllProjects.map((key) => (
          <SingleProject key={key._id} project={{ ...key, id: key._id }} />
        )) : data?.getAllProjects && searchProject?.length > 2
          ? data.getAllProjects.filter((key) => key.name.includes(searchProject))
            .map((key) => (
              <SingleProject key={key._id} project={{ ...key, id: key._id }} />
            )) : null}
      </div>
    </>
  );
};

export default ProjectsList;
