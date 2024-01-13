import React from 'react';
import StepFour from './StepFour';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';

const AddProjectForm = ({ inputs, setInputs, activeIndex }) => {
  return (
    <>
      {activeIndex === 0 ? <StepOne inputs={inputs} setInputs={setInputs} /> : null}
      {activeIndex === 1 ? <StepTwo inputs={inputs} setInputs={setInputs} /> : null}
      {activeIndex === 2 ? <StepThree inputs={inputs} setInputs={setInputs} /> : null}
      {activeIndex === 3 ? <StepFour inputs={inputs} setInputs={setInputs} /> : null}
    </>
  );
};

export default AddProjectForm;
