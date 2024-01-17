import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { sendQuery } from '../../globalFuncs';
import { toastAtom, userAtom } from '../../layout';

const RoleModalBtns = ({ data, refetch, name, id }) => {
  const [user] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const [toast] = useAtom(toastAtom);
  const handleClick = async (ev, claim) => {
    ev.preventDefault();
    setLoading(true);
    const myQuery = `
      mutation UpdateUserProfile($currentUser: String!, $userid: ID!, $claim: Obj!) {
        addCustomClaim(currentUser: $currentUser, userid: $userid, claim: $claim)
      }
    `;
    const results = await sendQuery(myQuery, { currentUser: user.email, userid: id, claim: claim });
    if (results.data && !results.errors) {
      setLoading(false);
      refetch();
      return toast.current.show({ severity: 'success', summary: 'Successfully removed an Admin', detail: `${name} is now a Normal user`, life: 5000 });
    }
    setLoading(false);
    return toast.current.show({ severity: 'error', summary: 'Failed to remove Admin', detail: results.errors ? results.errors[0].message : '', sticky: true });
  };
  return (
    <>
      {data && data.getUserRole && data.getUserRole.admin && data.getUserRole.admin === true ? (
        <Button
          className="bg-pink-500 border-pink-500"
          loading={loading}
          label="Remove Admin"
          onClick={(ev) => handleClick(ev, { admin: false })}
        />
      ) : (
        <Button
          label="Make user an Admin"
          className="bg-pink-500 border-pink-500"
          loading={loading}
          onClick={(ev) => handleClick(ev, { admin: true })}
        />
      )}
    </>
  );
};

export default RoleModalBtns;
