import React from 'react';
import { Button } from 'primereact/button';
import { useAtom } from 'jotai';
import { navigate } from 'gatsby';
import SectionHeading from '../reusable/SectionHeading';
import { userAtom } from '../layout';
import TopStats from './topstats/TopStats';
import DonationList from './donationList/DonationList';

const MyDonations = () => {
  const [user] = useAtom(userAtom);
  return (
    <>
      <SectionHeading title={user.name} des="My Donations">
        <Button
          label="Edit Profile"
          className="bg-pink-500 border-none"
          onClick={(ev) => {
            ev.preventDefault();
            navigate('/profile');
          }}
        />
      </SectionHeading>
      <TopStats />
      <DonationList />
    </>
  );
};

export default MyDonations;
