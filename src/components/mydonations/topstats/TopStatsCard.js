import React from 'react';

const TopStatsCard = ({ title, statNumber, statmessage, icon, iconColor }) => {
  return (
    <div className="col-12 md:col-6 lg:col-3" style={{ minWidth: '300px' }}>
      <div className="surface-card shadow-2 p-3 border-round">
        <div className="flex justify-content-between mb-3">
          <div>
            <span className="block text-500 font-medium mb-3">{title}</span>
            <div className="text-900 font-medium text-xl">{statNumber}</div>
          </div>
          <div className={`flex align-items-center justify-content-center bg-${iconColor}-100 border-round`} style={{ width: '2.5rem', height: '2.5rem' }}>
            <i className={`pi pi-${icon} text-${iconColor}-500 text-xl`} />
          </div>
        </div>
        <span className={`text-${iconColor}-400`}>{statmessage}</span>
      </div>
    </div>
  );
};

export default TopStatsCard;
