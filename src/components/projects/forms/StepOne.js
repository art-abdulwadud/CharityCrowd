import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

const StepOne = ({ inputs, setInputs }) => {
  return (
    <>
      <span className="p-float-label">
        <InputText id="name" value={inputs.name} onChange={(ev) => setInputs({ ...inputs, name: ev.target.value })} required className="w-100 bx-none" />
        <label htmlFor="name">
          Name of the project
          {' '}
          <sup className="text-pink-500">*</sup>
        </label>
      </span>
      <span className="p-float-label mt-5">
        <InputTextarea rows={5} cols={30} id="des" value={inputs.description} onChange={(ev) => setInputs({ ...inputs, description: ev.target.value })} required className="w-100 bx-none" />
        <label htmlFor="des">
          Description
          {' '}
          <sup className="text-pink-500">*</sup>
        </label>
      </span>
    </>
  );
};

export default StepOne;
