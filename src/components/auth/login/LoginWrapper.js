import React, { useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import { navigate } from 'gatsby';
import { useAtom } from 'jotai';
import AuthBtn from '../AuthBtn';
import AuthInput from '../AuthInput';
import { toastAtom } from '../../layout';

const LoginWrapper = () => {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast] = useAtom(toastAtom);
  const handleSubmit = async (ev) => {
    try {
      ev.preventDefault();
      setLoading(true);
      await firebase.auth().signInWithEmailAndPassword(inputs.email, inputs.password);
      navigate('/dashboard');
      setLoading(false);
      return toast.current.show({ severity: 'success', summary: 'Successfully logged in', detail: 'Welcome back. Log in was successful', life: 3000 });
    } catch (error) {
      setLoading(false);
      return toast.current.show({ severity: 'error', summary: 'Error Signing in', detail: error.message, sticky: true });
    }
  };
  return (
    <div className="px-4 py-8 md:px-6 lg:px-8 flex align-items-center justify-content-center bg-pink-500" style={{ minHeight: '100vh' }}>
      <form
        className="p-6 shadow-2 text-center bg-white lg:w-30rem"
        onSubmit={handleSubmit}
        style={{ borderRadius: '12px' }}
      >
        <div className="text-4xl font-medium mb-6">Sign In</div>
        <AuthInput label="Email" type="email" getValue={(value) => setInputs({ ...inputs, email: value })} />
        <AuthInput label="Password" type="password" getValue={(value) => setInputs({ ...inputs, password: value })} />
        <AuthBtn label="Sign In" loading={loading} />
        {/* <a className="cursor-pointer font-medium block text-center text-200 underline" sty>Forgot Password?</a> */}
      </form>
    </div>
  );
};

export default LoginWrapper;
