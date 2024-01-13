import React from 'react';
import { Ripple } from 'primereact/ripple';
import { Link } from 'gatsby';
import { useAtom } from 'jotai';
import { pageAtom } from '../layout';

const SideNav = ({ link, label, icon }) => {
  const [page] = useAtom(pageAtom);
  return (
    <li>
      <Link
        to={link}
        onClick={(ev) => page === link ? ev.preventDefault() : null}
        className={`p-ripple flex align-items-center cursor-pointer p-3 border-round ${`${link}/`.includes(page) ? 'text-pink-500' : 'text-700'} hover:surface-100 transition-duration-150 transition-colors w-full`}
      >
        <i className={`pi pi-${icon} mr-2`} />
        <span className="font-medium">{label}</span>
        <Ripple />
      </Link>
    </li>
  );
};

export default SideNav;
