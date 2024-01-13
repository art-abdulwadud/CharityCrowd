import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

const ReactQueryPreloader = ({ isLoading, isError, error, heightAuto }) => {
  if (isLoading) {
    return (
      <div className={`w-100 ${heightAuto ? 'h-100' : 'h-100vh'} d-flex center column m-0`}>
        <HashLoader color="#ea2c58" background="white" size={90} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`w-100 ${heightAuto ? 'h-100' : 'h-100vh'} d-flex center column linear-bg m-0`}>
        <h1 className="text-pink-500">Error</h1>
        <span className="text-base">{error?.message || 'No data was received'}</span>
      </div>
    );
  }
  return (<></>);
};

export default ReactQueryPreloader;
