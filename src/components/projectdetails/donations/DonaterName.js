import React, { useEffect, useState } from 'react';
import { getUsername } from '../../layout';

const DonaterName = ({ userId }) => {
  const [username, setUsername] = useState('Loading...');
  const settingUsername = async () => {
    const username = await getUsername(userId);
    setUsername(username);
  };
  useEffect(() => {
    if (userId) settingUsername();
    return () => null;
  }, [userId]);
  return (
    <>{username}</>
  );
};

export default DonaterName;
