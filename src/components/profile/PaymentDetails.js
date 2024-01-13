import React from 'react';
import PaymentDetailsForm from './forms/PaymentDetailsForm';

const PaymentDetails = ({ data, setEditing, editing }) => {
  return (
    <div className="col-12 lg:col-10">
      <PaymentDetailsForm data={data} setEditing={setEditing} editing={editing} />
    </div>
  );
};

export default PaymentDetails;
