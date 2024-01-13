/* eslint-disable max-statements */
import React from 'react';
import GoogleAuth from '../googleAuth';

const SignUpWrapper = () => {
  return (
    <div className="px-4 py-8 md:px-6 lg:px-8 flex align-items-center justify-content-center bg-pink-500" style={{ minHeight: '100vh' }}>
      <div
        className="p-6 shadow-2 text-center bg-white lg:w-30rem"
        style={{ borderRadius: '12px' }}
      >
        <div className="text-4xl font-medium mb-6">Sign Up</div>
        <GoogleAuth authType="Sign up" />
      </div>
    </div>
  );
};

export default SignUpWrapper;
