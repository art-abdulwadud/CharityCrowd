import React from 'react';
import UserInfoForm from './forms/UserInfoForm';

const UserInfo = ({ data, setEditing, editing }) => {
  return (
    <div className="col-12 lg:col-10">
      <div className="grid formgrid p-fluid">
        <UserInfoForm data={data} setEditing={setEditing} editing={editing} />
      </div>
    </div>
  );
};

export default UserInfo;
