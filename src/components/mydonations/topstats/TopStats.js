import React from 'react';
import TopStatsCard from './TopStatsCard';

const TopStats = () => {
  return (
    <div className="surface-ground py-5 px-3">
      <div className="grid">
        {/* Account for number of donations made by user */}
        <TopStatsCard title="My Donations" statNumber={0} statmessage="Number of donations made" icon="user" iconColor="green" />
        {/* Account for total amount donated by user */}
        <TopStatsCard title="Amount Donated" statNumber={`$${0}`} statmessage="Total amount donated" icon="money-bill" iconColor="pink" />
        {/* Account for number of projects funded by user */}
        <TopStatsCard title="Projects Funded" statNumber={0} statmessage="Number of projects funded" icon="user" iconColor="yellow" />
      </div>
    </div>
  );
};

export default TopStats;
