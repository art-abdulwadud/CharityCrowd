import React from 'react';
import IntroBtns from './IntroBtns';

const IntroHeader = () => {
  return (
    <div className="grid grid-nogutter surface-section text-800 h-100vh">
      <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
        <section>
          <span className="block text-6xl font-bold mb-1">Fund <span className="text-pink-500">Crucial</span></span>
          <div className="text-6xl font-bold mb-3">
            Projects/Causes
          </div>
          <p className="mt-0 mb-4 text-700 line-height-3">
            Introducing CharityCrowd, a powerful platform designed to
            empower individuals to make a tangible impact on real-life projects
            and causes. A seamless and user-friendly
            experience for users who want to contribute funds to meaningful
            initiatives that align with their values.
          </p>
          <IntroBtns />
        </section>
      </div>
      <div className="col-12 md:col-6 overflow-hidden flex center">
        <img
          src="/bg-1.svg"
          alt="hero-1"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    </div>
  );
};

export default IntroHeader;
