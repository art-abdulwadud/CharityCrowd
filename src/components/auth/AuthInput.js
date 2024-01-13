import React from 'react';

const AuthInput = ({ label, type, getValue }) => {
  return (
    <input
      type={type}
      required
      className="appearance-none border-none p-3 w-full outline-none text-xl block mb-4 bg-black-alpha-10 text-black-alpha-60"
      placeholder={label}
      style={{ borderRadius: '30px' }}
      onChange={(ev) => getValue(ev.target.value)}
    />
  );
};

export default AuthInput;
