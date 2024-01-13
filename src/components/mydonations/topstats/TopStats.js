import React from 'react';
import TopStatsCard from './TopStatsCard';

const TopStats = () => {
  return (
    <div className="surface-ground py-5 px-3">
      <div className="grid">
        <TopStatsCard title="My Donations" statNumber={10} statmessage="Number of donations made" icon="user" iconColor="green" />
        <TopStatsCard title="Amount Donated" statNumber={`$${200}`} statmessage="Total amount donated" icon="money-bill" iconColor="pink" />
        <TopStatsCard title="Projects Funded" statNumber={1} statmessage="Number of projects funded" icon="user" iconColor="yellow" />
      </div>
    </div>
  );
};

export default TopStats;
