/* eslint-disable max-statements */
import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { useAtom } from 'jotai';
import { sendQuery } from '../../globalFuncs';
import { queryClient, toastAtom, userAtom } from '../../layout';

const PaymentDetailsForm = ({ data }) => {
  const [user] = useAtom(userAtom);
  const [inputs, setInputs] = useState({ payment: {} });
  const [toast] = useAtom(toastAtom);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    data?.payment?.cardNumber ? data.payment.cardNumber = data.payment.cardNumber.toString() : null;
    setInputs({ payment: { ...data?.payment } });
    return setInputs({ payment: { ...data?.payment } });
  }, [data]);
  const updateInput = (key, value) => {
    const newObj = inputs;
    newObj.payment[key] = key === 'cardNumber' ? value.toString() : value;
    setInputs(newObj);
  };
  const validate = (callback) => {
    setLoading(false);
    callback();
  };
  const handleSubmit = async (ev) => {
    try {
      ev.preventDefault();
      setLoading(true);
      const invalid = inputs.payment.cardNumber.toString().length < 8;
      if (invalid) return validate(() => toast.current.show({ severity: 'error', summary: 'Missing/insufficient required info', detail: 'Please make sure you enter the correct details', sticky: true }));
      const myQuery = `
            query Query($userid: ID!, $updates: UserInput!) {
              updateUserProfile(userid: $userid, updates: $updates)
            }
          `;
      const results = await sendQuery(myQuery, { userid: user.id, updates: inputs });
      setLoading(false);
      queryClient.invalidateQueries(['fetchUserProfile']);
      if (results.errors) return toast.current.show({ severity: 'error', summary: 'Error updating your payment details', detail: results.errors[0].message, sticky: true });
      return toast.current.show({ severity: 'success', summary: 'Payment details updated', detail: 'Your payment details have been successfully updated', life: 5000 });
    } catch (error) {
      setLoading(false);
      return toast.current.show({ severity: 'error', summary: 'Error updating your payment details', detail: error.message, sticky: true });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="grid formgrid p-fluid">
      <div className="field mb-4 col-12">
        <label htmlFor="card-number" className="font-medium text-900">Card Number</label>
        <InputNumber id="card-number" useGrouping={false} value={inputs.payment.cardNumber || data?.payment?.cardNumber || ''} onChange={(ev) => updateInput('cardNumber', ev.value)} required />
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
        <InputText id="pin-number" type="password" minLength={3} defaultValue={inputs.payment.cvv || data.payment.cvv || ''} onChange={(ev) => updateInput('cvv', ev.target.value)} maxLength={4} required />
      </div>
      <div className="col-12">
        <Button label="Save Changes" className="w-auto mt-3 bg-pink-500 border-pink-500" type="submit" loading={loading} />
      </div>
    </form>
  );
};

export default PaymentDetailsForm;
