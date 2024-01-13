import React from 'react';
import { numberWithCommas } from '../../layout';
import DonaterName from './DonaterName';

const DonationCard = ({ donation, title }) => {
  return (
    <>
      {donation.userId ? (
        <div className="col-12 md:col-6">
          <div className="p-3 border-1 border-300 border-round surface-0">
            <div className="text-900 mb-2">
              <span className="font-medium capitalize">{title}</span>
            </div>
            <div className="text-700 capitalize">{donation.anonymous ? 'Anonymous' : <DonaterName userId={donation.userId} />}</div>
            <div className="text-700 capitalize text-green-500">$ {numberWithCommas(donation.amount)}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DonationCard;
