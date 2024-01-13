import React from 'react';

const TableSearchBox = () => {
  return (
    <form>
      <div className="search_field">
        <input type="text" placeholder="Search content here..." />
      </div>
      <button type="submit">
        {' '}
        <i className="pi pi-search" />
        {' '}
      </button>
    </form>
  );
};

export default TableSearchBox;
