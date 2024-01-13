import React from 'react';
import { InputText } from 'primereact/inputtext';

const StepFour = ({ inputs, setInputs }) => {
  const changeValue = (key, value) => {
    const obj = { ...inputs.beneficiary };
    obj[key] = value;
    setInputs({ ...inputs, beneficiary: obj });
  };
  return (
    <>
      <span className="p-float-label">
        <InputText id="beneficiary-name" value={inputs.beneficiary.name} onChange={(ev) => changeValue('name', ev.target.value)} required className="w-100 bx-none" />
        <label htmlFor="beneficiary-name">
          Name of the beneficiary
          {' '}
          <sup className="text-pink-500">*</sup>
        </label>
      </span>
      <span className="p-float-label mt-5">
        <InputText id="beneficiary-location" value={inputs.beneficiary.location} onChange={(ev) => changeValue('location', ev.target.value)} required className="w-100 bx-none" />
        <label htmlFor="beneficiary-location">
          Where the beneficiary is located
          {' '}
          <sup className="text-pink-500">*</sup>
        </label>
      </span>
    </>
  );
};

export default StepFour;
