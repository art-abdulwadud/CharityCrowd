import React from 'react';
import GoogleAuth from '../googleAuth';

const LoginWrapper = () => {
  return (
    <div className="px-4 py-8 md:px-6 lg:px-8 flex align-items-center justify-content-center bg-pink-500" style={{ minHeight: '100vh' }}>
      <form
        className="p-6 shadow-2 text-center bg-white lg:w-30rem"
        onSubmit={(e) => e.preventDefault()}
        style={{ borderRadius: '12px' }}
      >
        <div className="text-4xl font-medium mb-6">Sign In</div>
        <GoogleAuth authType="Sign in" />
        {/* <a className="cursor-pointer font-medium block text-center text-200 underline" sty>Forgot Password?</a> */}
      </form>
    </div>
  );
};

export default LoginWrapper;
