import React, { useEffect } from 'react';
import StageTwoCart from './StageTwoCart';
import StageTwoPayment from './StageTwoPayment';

const StageTwo = ({ inputs, setInputs, activeSlide, stageTwoRef, projectId, switchSlide, currentProject }) => {
  useEffect(() => {
    activeSlide === 1 ? stageTwoRef.current?.classList.add('add-left') : null;
  }, [stageTwoRef]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-lg-12 col-xl-6">
          <StageTwoPayment inputs={inputs} setInputs={setInputs} projectId={projectId} />
        </div>
        <div className="hide-on-small-screen col-xl-1">
          <div className="flex relative align-items-center justify-content-center mx-3 py-3 min-h-full">
            <div className="border-left-1 border-300 top-0 left-50 absolute h-full" />
          </div>
        </div>
        <div className="col-md-12 col-lg-12 col-xl-5 mb-5">
          <StageTwoCart inputs={inputs} setInputs={setInputs} projectId={projectId} switchSlide={switchSlide} currentProject={currentProject} activeSlide={activeSlide} />
        </div>
      </div>
    </div>
  );
};

export default StageTwo;
