import React from 'react';
import { numberWithCommas } from '../../layout';
import DonaterName from './DonaterName';

const SingleDonation = ({ donation }) => {
  return (
    <li className="flex flex-column sm:flex-row sm:justify-content-between sm:align-items-center mb-5 pb-3" style={{ borderBottom: '1px solid black' }}>
      <div className="flex align-items-center">
        <div>
          <div className="text-900 font-medium text-xl mb-2 capitalize">{donation.anonymous ? 'Anonymous' : <DonaterName userId={donation.userId} />}</div>
          <div className="flex align-items-center">
            <i className="pi pi-calendar text-600 mr-2" />
            <span className="text-600">{new Date(parseInt(donation.createdAt)).toDateString()}</span>
            <span className="inline-flex p-1 bg-green-100 text-green-600 font-medium text-sm border-round ml-3">$ {numberWithCommas(donation.amountDonated)}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SingleDonation;
