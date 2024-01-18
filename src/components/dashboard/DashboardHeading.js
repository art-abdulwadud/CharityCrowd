import { navigate } from 'gatsby';
import { Button } from 'primereact/button';
import { useAtom } from 'jotai';
import React from 'react';
import { userAtom } from '../layout';
import SectionHeading from '../reusable/SectionHeading';

const DashboardHeading = () => {
  const [user] = useAtom(userAtom);
  return (
    <SectionHeading title={user.name} des={user.bio || ''}>
      <Button
        label="Edit Profile"
        className="bg-pink-500 border-none"
        onClick={(ev) => {
          ev.preventDefault();
          navigate('/profile');
        }}
      />
    </SectionHeading>
  );
};

export default DashboardHeading;
