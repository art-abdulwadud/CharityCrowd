/* eslint-disable jsx-a11y/anchor-is-valid */
import { Ripple } from 'primereact/ripple';
import firebase from 'gatsby-plugin-firebase';
import { StyleClass } from 'primereact/styleclass';
import { MdLogout } from 'react-icons/md';
import React, { useRef } from 'react';
import { useAtom } from 'jotai';
import { navigate } from 'gatsby';
import SideNav from './SideNav';
import IconSideNav from './IconSideNav';
import { pageAtom, pageLoadingAtom, userAtom } from '../layout';

const Sidebar = ({ children }) => {
  const [user, checkUser] = useAtom(userAtom);
  const [, setPageLoading] = useAtom(pageLoadingAtom);
  const [page] = useAtom(pageAtom);
  const btnRef5 = useRef();
  const btnRef6 = useRef();
  return (

    <div className="min-h-screen flex relative lg:static surface-ground">
      <div id="app-sidebar" className="surface-section h-full lg:h-auto hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none" style={{ width: '280px' }}>
        <div className="flex flex-column h-full">
          <div className="flex align-items-center px-5 flex-shrink-0" style={{ height: '60px' }}>
            <img src="/favicon.png" alt="hyper-700" height={50} width={130} />
          </div>
          <div className="overflow-y-auto">
            <ul className="list-none p-0 m-0 overflow-hidden mt-4">
              <SideNav label="Dashboard" link="/dashboard" icon="chart-bar" />
              {user.id && user.admin ? <SideNav label="Administration" link="/administration" icon="users" /> : null}
              <SideNav label="Projects" link="/projects" icon="folder" />
              <SideNav label="My Donations" link="/mydonations" icon="money-bill" />
              <SideNav label="Notifications" link="/" icon="bell" />
            </ul>
          </div>
        </div>
      </div>
      <div className="min-h-screen flex flex-column relative flex-auto">
        <div className="flex justify-content-between align-items-center px-2 pe-0 surface-0 border-bottom-1 surface-border relative lg:static" style={{ height: '60px' }}>
          <div className="flex">
            <StyleClass nodeRef={btnRef5} selector="#app-sidebar" enterClassName="hidden" enterActiveClassName="fadeinleft" leaveToClassName="hidden" leaveActiveClassName="fadeoutleft" hideOnOutsideClick>
              <a ref={btnRef5} className="p-ripple cursor-pointer block lg:hidden text-700 mr-3">
                <i className="pi pi-bars text-4xl" />
                <Ripple />
              </a>
            </StyleClass>
          </div>
          <StyleClass nodeRef={btnRef6} selector="@next" enterClassName="hidden" enterActiveClassName="fadein" leaveToClassName="hidden" leaveActiveClassName="fadeout" hideOnOutsideClick>
            <a ref={btnRef6} className="p-ripple cursor-pointer block lg:hidden text-700">
              <i className="pi pi-ellipsis-v text-2xl" />
              <Ripple />
            </a>
          </StyleClass>
          <ul className="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row
    surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static"
          >
            <IconSideNav
              label={<i className="pi pi-user text-base lg:text-xl mr-2 lg:mr-0 p-overlay-badge" />}
              link="/profile"
              iconElement={<span className={`text-base mr-2 lg:mr-0 ${page.includes('profile') ? 'text-pink-500' : 'text-700'}`}>My Profile</span>}
            />
            <IconSideNav
              label={<MdLogout className="text-xl mr-1" />}
              link="/"
              iconElement={<span className="text-base mr-2 lg:mr-0">Sign Out</span>}
              clickEvent={async () => {
                setPageLoading(true);
                await firebase.auth().signOut();
                checkUser({});
                navigate('/login');
              }}
            />
          </ul>
        </div>
        <div className="flex flex-column flex-auto">{children}</div>
      </div>
    </div>

  );
};

export default Sidebar;
