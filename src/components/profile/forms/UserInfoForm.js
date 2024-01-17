/* eslint-disable max-statements */
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useAtom } from 'jotai';
import { sendQuery } from '../../globalFuncs';
import { queryClient, toastAtom, userAtom } from '../../layout';

const UserInfoForm = ({ data, setEditing, editing }) => {
  const [user] = useAtom(userAtom);
  const [inputs, setInputs] = useState({});
  const [toast] = useAtom(toastAtom);
  const [loading, setLoading] = useState(false);
  const updateInput = (key, value) => {
    const newObj = inputs;
    value === data[key] ? delete newObj[key] : newObj[key] = typeof value === 'string' ? value.toLowerCase() : value;
    Object.keys(newObj).length < 1 ? setEditing(false) : setEditing(true);
    setInputs(newObj);
  };
  const handleClick = async (ev) => {
    try {
      ev.preventDefault();
      setLoading(true);
      if (inputs.name && inputs.name.length < 1) return toast.current.show({ severity: 'error', summary: 'Error updating your profile', detail: 'Your username cannot be empty', sticky: true });
      const myQuery = `
        mutation UpdateUserProfile($userid: ID!, $updates: UserInput!) {
          updateUserProfile(userid: $userid, updates: $updates)
        }
      `;
      const results = await sendQuery(myQuery, { userid: user.id, updates: inputs });
      setLoading(false);
      setInputs({});
      setEditing(false);
      queryClient.invalidateQueries(['fetchUserProfile']);
      if (results.errors) return toast.current.show({ severity: 'error', summary: 'Error updating your profile', detail: results.errors[0].message, life: 5000 });
      return toast.current.show({ severity: 'success', summary: 'Profile updated', detail: 'Your profile has been successfully updated', life: 5000 });
    } catch (error) {
      setLoading(false);
      return toast.current.show({ severity: 'error', summary: 'Error updating your profile', detail: error.message, life: 5000 });
    }
  };
  return (
    <>
      <div className="field mb-4 col-12">
        <label htmlFor="username" className="font-medium text-900">Name</label>
        <InputText id="username" type="text" defaultValue={data.name || ''} onChange={(ev) => updateInput('name', ev.target.value)} className="capitalize" />
      </div>
      <div className="field mb-4 col-12">
        <label htmlFor="phone-number" className="font-medium text-900">Phone Number <span className="text-500">(Optional)</span></label>
        <InputText id="phone-number" type="text" placeholder="+255*********" defaultValue={data.phone || ''} onChange={(ev) => updateInput('phone', ev.target.value)} />
      </div>
      <div className="field mb-4 col-12 md:col-6">
        <label htmlFor="user-email" className="font-medium text-900">Email</label>
        <InputText id="user-email" type="text" defaultValue={data.email || ''} disabled />
      </div>
      <div className="field mb-4 col-12 md:col-6">
        <label htmlFor="country" className="font-medium text-900">Country <span className="text-500">(Optional)</span></label>
        <InputText id="country" type="text" defaultValue={data.country || ''} onChange={(ev) => updateInput('country', ev.target.value)} />
      </div>
      <div className="field mb-4 col-12 md:col-6">
        <label htmlFor="city" className="font-medium text-900">City <span className="text-500">(Optional)</span></label>
        <InputText id="city" type="text" defaultValue={data.city || ''} onChange={(ev) => updateInput('city', ev.target.value)} />
      </div>
      <div className="field mb-4 col-12 md:col-6">
        <label htmlFor="state" className="font-medium text-900">Address <span className="text-500">(Optional)</span></label>
        <InputText id="state" type="text" defaultValue={data.address || ''} onChange={(ev) => updateInput('address', ev.target.value)} />
      </div>
      <div className="field mb-4 col-12">
        <label htmlFor="bio" className="font-medium text-900">Bio <span className="text-500">(Optional)</span></label>
        <InputTextarea id="bio" type="text" rows={5} autoResize defaultValue={data.bio || ''} onChange={(ev) => updateInput('bio', ev.target.value)} />
      </div>
      <div className="col-12">
        <Button label="Save Changes" className="w-auto mt-3 bg-pink-500 border-pink-500" disabled={!editing} onClick={handleClick} loading={loading} />
      </div>
    </>
  );
};

export default UserInfoForm;
