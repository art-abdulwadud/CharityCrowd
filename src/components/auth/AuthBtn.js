/* eslint-disable react/button-has-type */
import React from 'react';

const AuthBtn = ({ label, loading, btnType, clickEvent }) => {
  return (
    <button
      type={btnType || 'submit'}
      className="appearance-none border-none p-3 w-full outline-none text-xl mb-4 font-medium w-12rem
      bg-pink-500 text-0 cursor-pointer transition-colors transition-duration-150"
      style={{ borderRadius: '30px' }}
      disabled={loading}
      onClick={(ev) => {
        if (clickEvent) {
          ev.preventDefault();
          clickEvent();
        }
      }}
    >
      {loading ? <i className="pi pi-spin pi-spinner" style={{ fontSize: '1em' }} /> : label}
    </button>
  );
};

export default AuthBtn;
