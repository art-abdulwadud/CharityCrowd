/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import RoleModal from './roleModal/RoleModal';

const UsersRow = ({ name, email, id }) => {
  const [showRoleModal, setShowRoleModal] = useState(false);
  return (
    <tr>
      <td className="capitalize">{name}</td>
      <td>{email}</td>
      <td>
        <Button
          label="Change"
          icon="pi pi-user-edit"
          className="text-xs bg-pink-500 border-pink-500"
          onClick={(ev) => {
            ev.preventDefault();
            setShowRoleModal(true);
          }}
        />
      </td>
      {showRoleModal ? <RoleModal modal={showRoleModal} toggle={() => setShowRoleModal(false)} email={email} id={id} name={name} /> : null}
    </tr>
  );
};

export default UsersRow;
