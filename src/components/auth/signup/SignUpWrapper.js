/* eslint-disable max-statements */
import React, { useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import { navigate } from 'gatsby';
import { useAtom } from 'jotai';
import AuthBtn from '../AuthBtn';
import AuthInput from '../AuthInput';
import { sendQuery } from '../../globalFuncs';
import { toastAtom } from '../../layout';

const SignUpWrapper = () => {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast] = useAtom(toastAtom);
  const myQuery = `
    mutation SignUpUser($email: String!, $password: String!) {
      signUpUser(email: $email, password: $password) {
        _id
      }
    }
  `;
  const handleSubmit = async (ev) => {
    try {
      ev.preventDefault();
      setLoading(true);
      if (inputs.password !== inputs.confirmPassword) {
        setLoading(false);
        return toast.current.show({ severity: 'error', summary: 'Passwords do not match', detail: 'Please make sure to repeat your password when confirming password', sticky: true });
      }
      const results = await sendQuery(myQuery, { email: inputs.email, password: inputs.password });
      if (results.errors && results.errors.length > 0) {
        setLoading(false);
        return toast.current.show({ severity: 'error', summary: 'Error Signing up', detail: results.errors[0].message, sticky: true });
      }
      await firebase.auth().signInWithEmailAndPassword(inputs.email, inputs.password);
      setLoading(false);
      setTimeout(() => navigate('/dashboard'), 1000);
      return toast.current.show({ severity: 'success', summary: 'Successfully Registered', detail: 'Just a sec, setting up your profile', life: 3000 });
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      return toast.current.show({ severity: 'error', summary: 'Error Signing up', detail: error.message, sticky: true });
    }
  };
  return (
    <div className="px-4 py-8 md:px-6 lg:px-8 flex align-items-center justify-content-center bg-pink-500" style={{ minHeight: '100vh' }}>
      <form
        className="p-6 shadow-2 text-center bg-white lg:w-30rem"
        onSubmit={handleSubmit}
        style={{ borderRadius: '12px' }}
      >
        <div className="text-4xl font-medium mb-6">Sign Up</div>
        <AuthInput label="Email" type="email" getValue={(value) => setInputs({ ...inputs, email: value })} />
        <AuthInput label="Password" type="password" getValue={(value) => setInputs({ ...inputs, password: value })} />
        <AuthInput label="Confirm Password" type="password" getValue={(value) => setInputs({ ...inputs, confirmPassword: value })} />
        <AuthBtn label="Sign Up" loading={loading} />
      </form>
    </div>
  );
};

export default SignUpWrapper;
