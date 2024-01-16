/* eslint-disable complexity */
/* eslint-disable max-statements */
import React, { useRef, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { navigate } from 'gatsby';
import { useAtom } from 'jotai';
import { FaRegEdit } from 'react-icons/fa';
import { copyToClipboard, sendQuery } from '../globalFuncs';
import PublicProjectDetails from './PublicProjectDetails';
import animateCSS from '../animate';
import ReactQueryPreloader from '../ReactQueryPreloader';
import StageOne from './forms/StageOne';
import StageTwo from './forms/StageTwo';
import { isBrowser, toastAtom, userAtom } from '../layout';

const ProjectDetails = ({ projectId, inputs, setInputs, currentProject }) => {
  const [toast] = useAtom(toastAtom);
  const [user] = useAtom(userAtom);
  const projectListRef = useRef();
  const donateAndShareButtons = useRef();
  const backAndProceedButtons = useRef();
  const stageOne = useRef();
  const stageTwo = useRef();
  const items = [
    { label: 'Projects', command: () => navigate('/projects') }
  ];
  const [activeSlide, setActiveSlide] = useState(1);
  const home = { icon: 'pi pi-home', url: '/' };
  const switchSlide = (goBack = false, value = null) => {
    const newSlide = value && goBack === false ? value : goBack === true ? activeSlide - 1 < 1 ? 1 : activeSlide - 1 : activeSlide + 1 > 3 ? 1 : activeSlide + 1;
    if (newSlide !== activeSlide) {
      newSlide === 2 && goBack !== true ? animateCSS(projectListRef.current, 'bounceOutLeft', () => projectListRef.current.classList.add('add-margin-left')) : newSlide === 1 ? animateCSS(projectListRef.current, 'bounceInLeft', () => null, () => projectListRef.current.classList.remove('add-margin-left')) : null;
      (newSlide === 3 && goBack !== true) || (newSlide === 1 && goBack === true) ? animateCSS(stageOne.current, 'bounceOutLeft', () => stageOne.current.classList.add('add-left')) : newSlide === 2 ? newSlide === 2 ? animateCSS(stageOne.current, 'bounceInLeft', () => null, () => stageOne.current.classList.remove('add-left')) : null : null;
      (newSlide === 2 && goBack === true) || (newSlide === 1) ? animateCSS(stageTwo.current, 'bounceOutLeft', () => stageTwo.current.classList.add('add-left')) : newSlide === 3 ? animateCSS(stageTwo.current, 'bounceInLeft', () => null, () => stageTwo.current.classList.remove('add-left')) : null;
    }
    setActiveSlide(newSlide);
  };
  const handleShare = (ev) => {
    ev.preventDefault();
    copyToClipboard(`${isBrowser ? `${window.location.href}` : ''}`, toast);
  };
  const requestLogin = () => navigate('/login');
  useEffect(() => {
    return () => switchSlide(false, 1);
  }, []);
  const { isLoading, data, error, isError } = useQuery(['fetchProjectById'], async () => {
    const myQuery = `
        query GetProjectById($projectid: ID!) {
            getProjectById(projectid: $projectid) {
              name
              _id
              requiredAmount
              currentAmount
              userId
              firstDonation {
                userId
                amount
                anonymous
                timestamp
              }
              topDonation {
                userId
                amount
                anonymous
                timestamp
              }
              lastDonation {
                amount
                userId
                anonymous
                timestamp
              }
              description
              organizer {
                location
                email
                name
              }
              beneficiary {
                name
                location
                email
              }
              numberOfDonations
              createdAt
              updatedAt
            }
          }
        `;
    const results = await sendQuery(myQuery, { projectid: projectId });
    return results.data && results.data.getProjectById ? results.data.getProjectById : null;
  }, { enabled: !!activeSlide });
  if (isLoading || isError || !data) {
    return (<ReactQueryPreloader isError={isError} isLoading={isLoading} error={error} />);
  }
  return (
    <div className="px-3 py-2">
      {data ? (
        <>
          <BreadCrumb model={items} home={home} className="mb-2" />
          <div className="surface-card p-4 shadow-2 border-round">
            <div className="font-medium text-3xl text-pink-500 mb-3 flex gap-1 align-items-center">
              <span>Project details</span>
              {/* Only allow the user who created the project to edit it */}
              {user?.id === data.userId ? <FaRegEdit /> : null}
            </div>
            <div className="text-500 mb-3">
              Project was posted on {new Date(parseInt(data.createdAt)).toDateString()} {`${data.numberOfDonations > 0 ? `and has ${data.numberOfDonations} donations` : ''}`}
            </div>
            <div className={`flex justify-content-between pb-3 ${activeSlide > 1 ? 'hide-section' : 'animate__animated animate__fadeInDown'}`} ref={donateAndShareButtons}>
              <Button label="Donate" icon="pi pi-shopping-cart" className="p-button-outlined bg-pink-500 border-pink-500 text-white w-6 mr-2" onClick={user.id ? switchSlide : requestLogin} type="button" />
              <Button label="Share" icon="pi pi-share-alt" className="p-button-outlined p-button-secondary border-pink-500 w-6 ml-2" onClick={handleShare} type="button" />
            </div>
            <div className={`flex justify-content-between pb-3 ${activeSlide < 2 ? 'hide-section' : 'animate__animated animate__fadeInUp'}`} ref={backAndProceedButtons}>
              <Button label="Back" icon="pi pi-angle-left" className="p-button-outlined bg-pink-500 border-pink-500 text-white mr-2" onClick={() => switchSlide(true)} />
            </div>
            <div className="position-relative" style={{ overflow: 'visible' }}>
              <ul className="list-none p-0 m-0 border-top-1 border-300" ref={projectListRef}>
                <PublicProjectDetails data={data} projectListRef={projectListRef} />
              </ul>
              <div className="position-absolute" ref={stageOne} style={{ top: '0', minHeight: '700px' }}><StageOne inputs={inputs} setInputs={setInputs} switchSlide={switchSlide} activeSlide={activeSlide} stageOneRef={stageOne} projectId={projectId} /></div>
              <div className="position-absolute w-100" ref={stageTwo} style={{ top: '0', minHeight: '700px' }}><StageTwo inputs={inputs} setInputs={setInputs} switchSlide={switchSlide} activeSlide={activeSlide} stageTwoRef={stageTwo} projectId={projectId} currentProject={currentProject} /></div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ProjectDetails;
