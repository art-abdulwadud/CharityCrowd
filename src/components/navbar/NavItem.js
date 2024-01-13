import React from 'react';
import { Ripple } from 'primereact/ripple';
import { useAtom } from 'jotai';
import { Link } from 'gatsby';
import { pageAtom } from '../layout';

const NavItem = ({ label, logo, link, clickEvent }) => {
  const [page] = useAtom(pageAtom);
  const handleClick = (ev) => {
    if (clickEvent) {
      ev.preventDefault();
      clickEvent();
    }
  };
  return (
    <li className="me-1 mb-1">
      <Link to={link || '/'} onClick={handleClick} className={`p-ripple flex px-6 p-3 lg:px-3 lg:py-2 align-items-center ${page === link || (link !== '/' && page.includes(link)) ? 'text-pink-500 border-1 border-pink-500' : 'text-900 hover:text-pink-500 hover:surface-100 border-1 border-white hover:border-pink-500'} font-medium border-round cursor-pointer transition-colors transition-duration-150 w-full`}>
        {logo ? <i className={`pi pi-${logo} mr-2`} /> : null}
        <span>{label}</span>
        <Ripple />
      </Link>
    </li>
  );
};

export default NavItem;
