import React from 'react';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { navigate } from 'gatsby';
import { useAtom } from 'jotai';
import { numberWithCommas, pageLoadingAtom } from '../layout';
import DonaterName from '../projectdetails/donations/DonaterName';

const SingleProject = ({ project }) => {
  const { id, name, description, requiredAmount, currentAmount, lastDonation } = project;
  const [, setPageLoading] = useAtom(pageLoadingAtom);
  return (
    <div className="col-12 md:col-6 xl:col-4 p-3 enlarge single-project">
      <div className="surface-card shadow-2 border-rounded p-3" style={{ minWidth: '360px' }}>
        <div className="flex border-bottom-1 surface-border pb-3">
          <div className="flex flex-column justify-content-between" style={{ minHeight: '150px' }}>
            <span className="text-lg text-pink-600 font-medium capitalize">{name}</span>
            <span className="text-600 font-medium short-des">{description}</span>
            <h5 className="text-pink-600 text-base mt-3">Status</h5>
            <div>
              <span className="inline-block text-sm text-pink-500 mr-1">$</span>
              <span className="text-sm text-900">
                {numberWithCommas(currentAmount)}
                {' '}
                out of
                {' '}
              </span>
              <span className="inline-block text-sm text-pink-500 mr-1">$</span>
              <span className="text-sm text-900">{numberWithCommas(requiredAmount)}</span>
            </div>
            <ProgressBar value={parseInt((currentAmount * 100) / requiredAmount)} showValue={false} style={{ height: '6px', minWidth: '295px' }} color="#e91e63" />
            {lastDonation?.userId ? (
              <>
                <h5 className="text-pink-600 text-base mt-3">Last Donation</h5>
                <div className="flex flex-column sm:flex-row sm:justify-content-between sm:align-items-center">
                  <div className="flex align-items-center">
                    <div>
                      <div className="text-900 font-medium text-sm mb-2 capitalize">{lastDonation.anonymous ? 'Anonymous' : <DonaterName userId={lastDonation.userId} />}</div>
                      <div className="flex align-items-center">
                        <i className="pi pi-calendar text-600 mr-2" />
                        <span className="text-600 text-xs">{new Date(parseInt(lastDonation.timestamp)).toDateString()}</span>
                        <span className="inline-flex p-1 bg-green-100 text-green-600 font-medium text-xs border-round ml-3">$ {numberWithCommas(lastDonation.amount)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
        <div className="flex pt-3">
          <Button
            label="More info"
            className="p-button-outlined bg-pink-500 border-pink-500 text-white w-100"
            onClick={() => {
              setPageLoading(true);
              navigate(`/project/?projectId=${id}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
