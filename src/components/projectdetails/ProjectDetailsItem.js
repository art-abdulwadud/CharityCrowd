import React, { useRef, useState, useEffect } from 'react';

const ProjectDetailsItem = ({ children, parent }) => {
  const [dark, setDark] = useState(false);
  const listItemRef = useRef();
  useEffect(() => {
    const indexNumber = Array.prototype.indexOf.call(parent.current.children, listItemRef.current);
    (indexNumber + 1) % 2 === 0 ? setDark(false) : setDark(true);
  }, []);
  return (
    <li className={`flex py-3 px-2 flex-wrap ${dark ? 'surface-ground' : ''}`} ref={listItemRef}>{children}</li>
  );
};

export default ProjectDetailsItem;
