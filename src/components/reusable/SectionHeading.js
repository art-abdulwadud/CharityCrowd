import React from 'react';

const SectionHeading = ({ children, title, des }) => {
  return (

    <div className="surface-section px-4 py-5 md:px-6 lg:px-8">
      <div className="flex md:align-items-center md:justify-content-between flex-column md:flex-row pb-4 border-bottom-1 surface-border">
        <div className="mb-3 lg:mb-0">
          <div className="text-3xl font-medium text-900 mb-3 capitalize">{title}</div>
          {des && des.length > 0 ? (
            <div className="text-500 mr-0 md:mr-3">
              {`${des.substring(0, 1).toUpperCase()}${des.substring(1)}`}
            </div>
          ) : null}
        </div>
        {children}
      </div>
    </div>

  );
};

export default SectionHeading;
