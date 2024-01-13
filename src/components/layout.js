import React, { useEffect } from 'react';
import { atom, Provider, useAtom } from 'jotai';
import firebase from 'gatsby-plugin-firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { navigate } from 'gatsby';

export const userAtom = atom({});
export const pageLoadingAtom = atom(true);

const Layout = ({ children }) => {
  const [user, checkUser] = useAtom(userAtom);
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);
  const getUserProfile = async (userId, email) => {
    // Fetch current user details and add them to the user atom
    const user = await firebase.firestore().collection('users').doc(userId).get();
    if (user.exists) {
      const { name, role, storeId, storeName, storeNumber } = user.data();
      checkUser({ id: userId, email: email, displayName: name.split(' ')[0], fullName: name, role: role, storeId: storeId, storeName: storeName, storeNumber: storeNumber, transactions: user.data().transactions || 0, clientsCreated: user.data().clientsCreated || 0 });
    }
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      // This where we confirm if a user is logged in or not
      if (user) {
        await getUserProfile(user.uid, user.email);
        setTimeout(() => user.uid ? setPageLoading(false) : null, 500);
      } else {
        checkUser({});
        if (!window.location.pathname.includes('sign') && !window.location.pathname.includes('login') && window.location.pathname.toLowerCase().split('/')[1] !== '') {
          setPageLoading(true);
          navigate('/login');
        }
        setTimeout(() => setPageLoading(false), 500);
      }
    });
    return () => null;
  }, []);
  return (
    <Provider>
      <main>
        {pageLoading ? (
          <div className="w-100 h-100vh d-flex center column linear-bg">
            {/* <RingLoader color="#000000" background="black" size={120} /> */}
          </div>
        ) : (
          <>
            {/* <NavBar /> */}
            { children }
          </>
        )}
        {console.log(user)}
      </main>
    </Provider>
  );
};

export default Layout;
