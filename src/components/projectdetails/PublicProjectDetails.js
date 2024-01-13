import React from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { navigate } from 'gatsby';
import { numberWithCommas } from '../layout';
import ProjectDetailsItem from './ProjectDetailsItem';
import DonationCard from './donations/DonationCard';
import DonationModal from './donations/DonationModal';

const PublicProjectDetails = ({ data, projectListRef }) => {
  const toggle = () => {
    const url = new URL(window.location.href);
    // TODO: Use navigate to open and close the modal eg navigate(`/project/?projectId=${id}&displayDonations=${false}`)
    url.searchParams.get('displayDonations')
      ? navigate(`/project/?projectId=${data._id}&displayDonations=${false}`)
      : navigate(`/project/?projectId=${data._id}&displayDonations=${true}`);
  };
  return (
    <>
      <ProjectDetailsItem parent={projectListRef}>
        <div className="text-pink-500 w-full md:w-2 font-medium">Name</div>
        <div className="text-900 w-full md:w-10 capitalize">{data.name}</div>
      </ProjectDetailsItem>
      <ProjectDetailsItem parent={projectListRef}>
        <div className="text-pink-500 w-full md:w-2 font-medium">Description</div>
        <div className="text-900 w-full md:w-10 line-height-3">{data.description}</div>
      </ProjectDetailsItem>
      <ProjectDetailsItem parent={projectListRef}>
        <div className="text-pink-500 w-full md:w-2 font-medium">Amount required</div>
        <div className="text-900 w-full md:w-10">$ {numberWithCommas(data.requiredAmount)}</div>
      </ProjectDetailsItem>
      <ProjectDetailsItem parent={projectListRef}>
        <div className="text-pink-500 w-full md:w-2 font-medium">Status</div>
        <div className="text-900 w-full md:w-10">
          <div>
            <span className="inline-block text-sm text-pink-500 mr-1">$</span>
            <span className="text-sm text-900">
              {numberWithCommas(data.currentAmount)}
              {' '}
              out of
              {' '}
            </span>
            <span className="inline-block text-sm text-pink-500 mr-1">$</span>
            <span className="text-sm text-900">{numberWithCommas(data.requiredAmount)}</span>
          </div>
          <ProgressBar value={parseInt((data.currentAmount * 100) / data.requiredAmount)} showValue={false} style={{ height: '6px', minWidth: '295px' }} color="#e91e63" />
        </div>
      </ProjectDetailsItem>
      {data.firstDonation.userId ? (
        <ProjectDetailsItem parent={projectListRef}>
          <DonationModal toggle={toggle} projectId={data._id} />
          <div className="text-pink-500 w-full md:w-2 font-medium">Donations
            <br />
            <a
              href="/"
              className="text-xs text-underlined"
              onClick={(ev) => {
                ev.preventDefault();
                navigate(`/project/?projectId=${data._id}&displayDonations=${true}`);
              }}
            >(list of donations)
            </a>
          </div>
          <div className="text-900 w-full md:w-10">
            <div className="grid mt-0 mr-0">
              <DonationCard donation={data.firstDonation} title="First Donation" />
              <DonationCard donation={data.topDonation} title="Top Donation" />
              <DonationCard donation={data.lastDonation} title="Last Donation" />
            </div>
          </div>
        </ProjectDetailsItem>
      ) : null}
      <ProjectDetailsItem parent={projectListRef}>
        <div className="text-pink-500 w-full md:w-2 font-medium">Organizer & Beneficiary</div>
        <div className="text-900 w-full md:w-10">
          <div className="grid mt-0 mr-0">
            <div className="col-12 md:col-6">
              <div className="p-3 border-1 border-300 border-round surface-0">
                <div className="text-900 mb-2">
                  <span className="font-medium capitalize">Organizer</span>
                </div>
                <div className="text-700 capitalize">{data.organizer.name}</div>
                <div className="text-700 capitalize">{data.organizer.location}</div>
              </div>
            </div>
            <div className="col-12 md:col-6">
              <div className="p-3 border-1 border-300 border-round surface-0">
                <div className="text-900 mb-2">
                  <span className="font-medium capitalize">Beneficiary</span>
                </div>
                <div className="text-700 capitalize">{data.beneficiary.name}</div>
                <div className="text-700 capitalize">{data.beneficiary.location}</div>
              </div>
            </div>
          </div>
        </div>
      </ProjectDetailsItem>
    </>
  );
};

export default PublicProjectDetails;
