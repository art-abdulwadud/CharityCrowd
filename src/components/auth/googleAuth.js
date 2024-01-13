import React, { useState } from 'react';
import { Button } from 'primereact/button';
import firebase from 'gatsby-plugin-firebase';

const googleAuth = ({ authType }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      setLoading(false);
      return { email: result.user.email, uid: result.user.uid };
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      return error.message;
    }
  };
  return (
    <Button
      label={`${authType} with Google`}
      onClick={handleClick}
      loading={loading}
      icon="pi pi-google"
      className="appearance-none border-none border-round p-3 w-full outline-none text-xl mb-4
    font-medium bg-pink-500 text-white cursor-pointer transition-colors transition-duration-150"
    />
  );
};

export default googleAuth;
