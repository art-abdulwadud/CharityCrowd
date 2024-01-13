import React from 'react';
import IntroBtns from './IntroBtns';

const IntroHeader = () => {
  return (

    <div className="grid grid-nogutter surface-section text-800 h-100vh">
      <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
        <section>
          <span className="block text-6xl font-bold mb-1">Fund</span>
          <div className="text-6xl font-bold mb-3">
            <span className="text-pink-500">crucial</span>
            {' '}
            Projects
          </div>
          <p className="mt-0 mb-4 text-700 line-height-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <IntroBtns />
        </section>
      </div>
      <div
        className="col-12 md:col-6 overflow-hidden flex center"
      >
        <img src="/bg-1.svg" alt="hero-1" style={{ width: '100%', height: 'auto' }} />
      </div>
    </div>

  );
};

export default IntroHeader;
