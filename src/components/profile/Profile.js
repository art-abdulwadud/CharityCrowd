import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { useAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { userAtom } from '../layout';
import { sendQuery } from '../globalFuncs';
import ReactQueryPreloader from '../ReactQueryPreloader';
import UserInfo from './UserInfo';
import PaymentDetails from './PaymentDetails';

const Profile = () => {
  const [user] = useAtom(userAtom);
  const [activeIndex, setActiveIndex] = useState(0);
  const userInfoTemplate = (options) => {
    return (
      <button type="button" onClick={options.onClick} className={options.className}>
        <i className="pi pi-user mr-2" />
        {options.titleElement}
      </button>
    );
  };

  const paymentTemplate = (options) => {
    return (
      <button type="button" onClick={options.onClick} className={options.className}>
        <i className="pi pi-money-bill mr-2" />
        {options.titleElement}
      </button>
    );
  };
  const [editing, setEditing] = useState(false);
  const { isLoading, data, error, isError } = useQuery(['fetchUserProfile'], async () => {
    const myQuery = `
     query GetUserProfile($userid: String!) {
       getUserProfile(userid: $userid) {
        _id
        name
        email
        admin
        phone
        bio
        country
        city
        address
        updatedAt
        payment {
           cardNumber
           nameOnCard
           expiryDate
           cvv
        }
       }
     }
    `;
    const results = await sendQuery(myQuery, { userid: user.id });
    if (results.data && results.data?.getUserProfile) return results.data.getUserProfile;
    throw new Error(results.errors[0].message);
  }, { enabled: !editing && !!user.id });
  if (isLoading || isError || data.message) {
    return (<ReactQueryPreloader isError={isError} isLoading={isLoading} error={error} />);
  }
  return (
    <div className="px-3 pt-2 pb-2">
      <TabView activeIndex={activeIndex} onTabChange={(ev) => setActiveIndex(ev.index)}>
        <TabPanel header="User profile" headerTemplate={userInfoTemplate}>
          <UserInfo data={data} editing={editing} setEditing={setEditing} />
        </TabPanel>
        <TabPanel header="Payment details" headerTemplate={paymentTemplate}>
          <PaymentDetails data={data} editing={editing} setEditing={setEditing} />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default Profile;
