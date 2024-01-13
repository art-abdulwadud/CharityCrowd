import React from 'react';
import { Link } from 'gatsby';

const LinkItem = ({ link, icon, label, des, iconBg }) => {
  return (
    <li className="pt-2">
      <Link to={link} className="cursor-pointer flex align-items-center border-round border-1 border-transparent hover:border-300 p-3 transition-colors transition-duration-150">
        <span className={`inline-flex align-items-center justify-content-center ${iconBg || 'bg-cyan-500'} border-round flex-shrink-0`} style={{ height: '52px', width: '52px' }}>
          <i className={`pi pi-${icon} text-white text-3xl`} />
        </span>
        <div className="ml-3">
          <span className="text-900 font-medium text-2xl mb-3">{label}</span>
          <p className="text-600 m-0 line-height-3">{des}</p>
        </div>
      </Link>
    </li>
  );
};

export default LinkItem;
