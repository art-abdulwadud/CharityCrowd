/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';
import firebase from 'gatsby-plugin-firebase';
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';
import { useAtom } from 'jotai';
import { navigate } from 'gatsby';
import NavItem from './NavItem';
import { pageLoadingAtom, userAtom } from '../layout';

const NavBar = () => {
  const [user, checkUser] = useAtom(userAtom);
  const [, setPageLoading] = useAtom(pageLoadingAtom);
  const btnRef1 = useRef();
  return (
    <div className="c-navbar pe-2 shadow-2 flex align-items-center justify-content-between relative lg:static" style={{ minHeight: '80px', maxHeight: '80px' }}>
      <img src="/favicon.png" alt="bastion-700" height={35} width={85} className="mr-0 ml-2" />
      <StyleClass nodeRef={btnRef1} selector="@next" enterClassName="hidden" leaveToClassName="hidden" hideOnOutsideClick>
        <a ref={btnRef1} className="cursor-pointer block lg:hidden text-0 text-pink-500">
          <i className="pi pi-bars text-4xl" />
          <Ripple />
        </a>
      </StyleClass>
      <div className="py-3 px-6 align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 top-100 z-1 shadow-2 lg:shadow-none c-navlist">
        <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row">
          <NavItem label="Home" logo="home" link="/" />
          {user.id ? <NavItem label="Dashboard" logo="chart-bar" link="/dashboard" /> : null}
          <NavItem label="Projects" logo="folder" link="/projects" />
        </ul>
        <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row border-top-1 surface-border lg:border-top-none lg:mt-0 mt-2">
          {user.id ? (
            <>
              <NavItem label="My Profile" logo="user" link="/profile" />
              <NavItem
                label="Sign Out"
                clickEvent={async () => {
                  setPageLoading(true);
                  await firebase.auth().signOut();
                  checkUser({});
                  navigate('/login');
                }}
              />
            </>
          ) : (
            <>
              <NavItem label="Sign In" link="/login" />
              <NavItem label="Sign Up" link="/signup" />
            </>
          )}
        </ul>
      </div>
    </div>

  );
};

export default NavBar;
