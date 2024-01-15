import React from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

const StageTwoPayment = ({ inputs, setInputs }) => {
  const updateInput = (key, value) => {
    const newObj = inputs;
    newObj.payment[key] = key === 'cardNumber' ? value?.toString() : value;
    setInputs(newObj);
  };
  return (
    <div className="py-3 grid">
      <div className="flex justify-content-between align-items-center mb-5 col-12">
        <span className="text-xl text-900 font-medium text-2xl text-pink-500">Checkout</span>
      </div>
      <div className="alert alert-warning text-xs" role="alert">
        <i className="pi pi-exclamation-triangle mr-2" />
        Note: This App is only a Demo! Please do not use your real payment details! Just use fake details!
      </div>
      <div className="grid formgrid p-fluid">
        <div className="field mb-4 col-12">
          <label htmlFor="card-number" className="font-medium text-900">Card Number</label>
          <InputNumber id="card-number" useGrouping={false} value={inputs.payment?.cardNumber || ''} onChange={(ev) => updateInput('cardNumber', ev.value)} required />
        </div>
        <div className="field mb-4 col-12">
          <label htmlFor="name-on-card" className="font-medium text-900">Name on Card</label>
          <InputText id="name-on-card" type="text" defaultValue={inputs.payment?.nameOnCard || ''} onChange={(ev) => updateInput('nameOnCard', ev.target.value)} required />
        </div>
        <div className="field mb-4 col-12 md:col-6">
          <label htmlFor="expiry-date" className="font-medium text-900">Expiry date</label>
          <Calendar id="expiry-date" value={inputs.payment?.expiryDate ? new Date(parseInt(inputs.payment?.expiryDate)) : ''} onChange={(ev) => updateInput('expiryDate', ev.target.value)} required />
        </div>
        <div className="field mb-4 col-12 md:col-6">
          <label htmlFor="pin-number" className="font-medium text-900">CVV</label>
          <InputText id="pin-number" type="password" minLength={3} defaultValue={inputs.payment?.cvv || ''} onChange={(ev) => updateInput('cvv', ev.target.value)} maxLength={4} required />
        </div>
      </div>
    </div>
  );
};

export default StageTwoPayment;
