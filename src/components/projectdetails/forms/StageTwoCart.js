/* eslint-disable max-statements */
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { useAtom } from 'jotai';
import { sendQuery } from '../../globalFuncs';
import { numberWithCommas, queryClient, userAtom } from '../../layout';

const StageTwoCart = ({ inputs, projectId, switchSlide, setInputs }) => {
  const [user] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const handleClick = async (ev) => {
    try {
      ev.preventDefault();
      setLoading(true);
      const myQuery = `
        query AddDonation($donation: DonationInput!) {
          addDonation(donation: $donation) {
            _id
            userId
            amountDonated
            modeOfPayment
            createdAt
            updatedAt
          }
        }
      `;
      await sendQuery(myQuery, { donation: { ...inputs, userId: user.id, modeOfPayment: 'credit/debit card', projectId: projectId } });
      queryClient.invalidateQueries(['fetchProjectById']);
      queryClient.invalidateQueries(['fetchUserDetails']);
      queryClient.invalidateQueries(['fetchProjectDonations']);
      setInputs({ ...inputs, amountToDonate: null });
      switchSlide(false, 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="surface-card shadow-2 border-round p-4">
      <div className="flex justify-content-between align-items-center mb-5">
        <span className="text-xl text-900 font-medium text-pink-500">Cart <i className="pi pi-shopping-cart" /></span>
      </div>
      <ul className="list-none p-0 m-0">
        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
          <div className="">
            <span className="inline-block text-900 font-medium mr-2 mb-1 md:mb-0">Your donation</span>
          </div>
          <div className="mt-2 md:mt-0 ml-0">
            <span className="text-green-500 ml-3 font-medium"><span className="text-pink-500">$ </span>{numberWithCommas(inputs.amountToDonate) || null}</span>
          </div>
        </li>
      </ul>
      <div className="flex w-100 col-12">
        <Button label={`Donate $ ${numberWithCommas(inputs.amountToDonate)}`} className="p-button-outlined bg-pink-500 border-pink-500 text-white mt-2 flex-1" onClick={handleClick} loading={loading} />
      </div>
    </div>
  );
};

export default StageTwoCart;
