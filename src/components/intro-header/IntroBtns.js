/* eslint-disable react/jsx-no-useless-fragment */
import { Button } from 'primereact/button';
import { Link } from 'gatsby';
import { useAtom } from 'jotai';
import React from 'react';
import { userAtom } from '../layout';

const IntroBtns = () => {
  const [user] = useAtom(userAtom);
  return (
    <>
      {user.id ? (
        <>
          <Link to="/dashboard">
            <Button label="Dashboard" type="button" className="mr-3 p-button-raised bg-pink-500 border-pink-500" />
          </Link>
          <Link to="/projects">
            <Button label="Projects" type="button" className="p-button-outlined border-pink-500 text-pink-500" />
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button label="Sign In" type="button" className="mr-3 p-button-raised bg-pink-500 border-pink-500" />
          </Link>
          <Link to="/signup">
            <Button label="Sign Up" type="button" className="p-button-outlined border-pink-500 text-pink-500" />
          </Link>
        </>
      )}
    </>
  );
};

export default IntroBtns;
