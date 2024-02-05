/* eslint-disable max-statements */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useRef } from 'react';
import { atom, Provider, useAtom } from 'jotai';
import { ScrollTop } from 'primereact/scrolltop';
import firebase from 'gatsby-plugin-firebase';
import HashLoader from 'react-spinners/HashLoader';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { navigate } from 'gatsby';
import { Toast } from 'primereact/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { sendQuery } from './globalFuncs';

export const queryClient = new QueryClient();

export const userAtom = atom({});
export const projectsAtom = atom([]);
export const pageLoadingAtom = atom(true);
export const toastAtom = atom({});
export const isBrowser = typeof window !== 'undefined';
export const pageAtom = atom(() => isBrowser ? window.location.pathname : '');
export const serverErrorAtom = atom(false);

export const numberWithCommas = (num) => {
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getUsername = async (userId) => {
  const myQuery = `
    query GetUserProfile($userid: String!) {
      getUserProfile(userid: $userid) {
        name
      }
    }
  `;
  const results = await sendQuery(myQuery, { userid: userId });
  if (results.data && results.data.getUserProfile) {
    const { name } = results.data.getUserProfile;
    return name;
  }
  return 'User not found';
};

const Layout = ({ children }) => {
  const [, checkUser] = useAtom(userAtom);
  const [page] = useAtom(pageAtom);
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);
  const [, setToast] = useAtom(toastAtom);
  const [serverError, setServerError] = useAtom(serverErrorAtom);
  const toastRef = useRef();
  const getUserProfile = async (userId) => {
    // Fetch current user details and add them to the user atom
    const myQuery = `
      query GetUserProfile($userid: String!) {
        getUserProfile(userid: $userid) {
          name
          email
          admin
        }
      }
    `;
    const results = await sendQuery(myQuery, { userid: userId });
    if (results.errors && results.errors.length > 0) return checkUser({});
    if (results.data && results.data.getUserProfile) {
      setServerError(false);
      const { name, email, admin } = results.data.getUserProfile;
      return checkUser({ id: userId, email: email, name: name, admin: admin });
    }
    return setServerError(true);
  };
  useEffect(() => {
    setToast(toastRef);
    firebase.auth().onAuthStateChanged(async (user) => {
      // This where we confirm if a user is logged in or not
      if (user) {
        await getUserProfile(user.uid);
        if (isBrowser && window.location.pathname.includes('project')) {
          const url = new URL(window.location.href);
          url.searchParams.set('userid', user.uid);
        }
        setTimeout(() => user.uid ? setPageLoading(false) : null, 500);
      } else {
        checkUser({});
        if (!page.includes('sign') && !page.includes('login') && !page.includes('project') && page.toLowerCase().split('/')[1] !== '') {
          setPageLoading(true);
          navigate('/login');
        }
        if (page.includes('project')) {
          const url = new URL(window.location.href);
          url.searchParams.delete('userid');
        }
        setTimeout(() => setPageLoading(false), 200);
      }
    });
    return () => null;
  }, []);
  return (
    <main>
      <Toast ref={toastRef} />
      {pageLoading ? (
        <div className="w-100 h-100vh d-flex center column m-0">
          <HashLoader color="#ea2c58" background="white" size={90} />
          <p className="text-pink-500 text-xs">Server is paused after long period of inactivity. It could take upto 60 seconds to restart the server</p>
        </div>
      ) : (
        <>
          {serverError
            ? (
              <div className="w-100 h-100vh d-flex center column m-0">
                <h1 className="text-pink-500">Server Error</h1>
              </div>
            )
            : (
              <>
                { children }
                <ScrollTop threshold={200} className="text-white bg-pink-500" />
              </>
            )}

        </>
      )}
    </main>
  );
};

export default ({ children }) => (
  <Provider>
    <QueryClientProvider client={queryClient}>
      <Layout>
        {children}
      </Layout>
    </QueryClientProvider>
  </Provider>
);
