import { useAtom } from 'jotai';
import React from 'react';
import { userAtom } from '../layout';
import LinkItem from './LinkItem';

const PageNotFound = () => {
  const [user] = useAtom(userAtom);
  return (
    <div className="surface-ground px-4 py-5 md:px-6 lg:px-8 h-100vh">
      <div className="shadow-2 border-round surface-card px-4 md:px-6 py-6">
        <div className="border-left-2 border-pink-500">
          <span className="bg-white text-pink-500 font-bold text-2xl inline-block px-3">404</span>
        </div>
        <div className="mt-6 mb-5 font-bold text-6xl text-900">Page Not Found</div>
        <p className="text-700 text-3xl mt-0 mb-6">Sorry, we couldn&apos;t find the page.</p>

        <ul className="list-none px-0 pb-0 pt-4 m-0 border-top-1 surface-border">
          <LinkItem link="/" icon="home" iconBg="bg-orange-500" label="Home" des="Go to home page" />
          {user.id
            ? <LinkItem link="/dashboard" icon="chart-bar" label="Dashboard" des="Go to your dashboard" />
            : null}
        </ul>
      </div>
    </div>
  );
};

export default PageNotFound;
