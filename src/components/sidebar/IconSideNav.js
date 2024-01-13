/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'gatsby';
import { Ripple } from 'primereact/ripple';
import React from 'react';

const IconSideNav = ({ label, link, icon, iconElement, clickEvent }) => {
  return (
    <li>
      <Link
        to={link}
        onClick={(ev) => {
          if (clickEvent) {
            ev.preventDefault();
            clickEvent();
          }
        }}
        className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors w-full"
      >
        {icon
          ? (
            <i className={`pi pi-${icon} text-base lg:text-xl mr-2 lg:mr-0 p-overlay-badge`}>
              {/* <Badge severity="danger" /> */}
            </i>
          ) : null}
        <span className="block lg:hidden font-medium">{label || ''}</span>
        {iconElement || null}
        <Ripple />
      </Link>
    </li>
  );
};

export default IconSideNav;
