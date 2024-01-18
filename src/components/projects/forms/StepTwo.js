import React from 'react';
import { InputNumber } from 'primereact/inputnumber';

const StepTwo = ({ inputs, setInputs }) => {
  return (
    <>
      <div className="field">
        <label htmlFor="required-amount" className="text-700">
          Total amount required for this project in US dollars $
          <sup className="text-pink-500">*</sup>
        </label>
        <InputNumber inputId="integeronly" id="required-amount" value={inputs.requiredAmount} onChange={(ev) => setInputs({ ...inputs, requiredAmount: ev.value })} required className="w-100" inputClassName="bx-none" />
      </div>
    </>
  );
};

export default StepTwo;
