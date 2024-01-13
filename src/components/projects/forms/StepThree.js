import React from 'react';
import { InputText } from 'primereact/inputtext';

const StepThree = ({ inputs, setInputs }) => {
  const changeValue = (key, value) => {
    const obj = { ...inputs.organizer };
    obj[key] = value;
    setInputs({ ...inputs, organizer: obj });
  };
  return (
    <>
      <span className="p-float-label">
        <InputText id="organizer-name" value={inputs.organizer.name} onChange={(ev) => changeValue('name', ev.target.value)} required className="w-100 bx-none" />
        <label htmlFor="organizer-name">
          Name of the organizer
          {' '}
          <sup className="text-pink-500">*</sup>
        </label>
      </span>
      <span className="p-float-label mt-5">
        <InputText id="organizer-location" value={inputs.organizer.location} onChange={(ev) => changeValue('location', ev.target.value)} required className="w-100 bx-none" />
        <label htmlFor="organizer-location">
          Where the organizer is located
          {' '}
          <sup className="text-pink-500">*</sup>
        </label>
      </span>
      <span className="p-float-label mt-5">
        <InputText type="email" id="organizer-email" value={inputs.organizer.email} onChange={(ev) => changeValue('email', ev.target.value)} className="w-100 bx-none" />
        <label htmlFor="organizer-email">
          Organizer's email
        </label>
      </span>
    </>
  );
};

export default StepThree;
