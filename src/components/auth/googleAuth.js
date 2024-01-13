import React, { useState } from 'react';
import { Button } from 'primereact/button';
import firebase from 'gatsby-plugin-firebase';
import { useAtom } from 'jotai';
import { toastAtom } from '../layout';

const GoogleAuth = ({ authType }) => {
  const [loading, setLoading] = useState(false);
  const [toast] = useAtom(toastAtom);
  const handleClick = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      setLoading(false);
      return toast.current.show({ severity: 'success',
        summary: 'Successfully logged in',
        detail: 'Welcome back. Log in was successful',
        life: 3000 });
    } catch (error) {
      setLoading(false);
      toast.current.show({ severity: 'error', summary: 'Error Signing in', detail: error.message, sticky: true });
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

export default GoogleAuth;
