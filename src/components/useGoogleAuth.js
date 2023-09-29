import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';

const GoogleAuthContext = createContext();
const API_URL = process.env.REACT_APP_DATABASE_URL

export default function useGoogleAuth() {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();

  useEffect(() => {
  }, [profile, user]);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => {
      console.log('Login Failed:', error);
    }
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`)
        .then((res) => {
          axios.post(API_URL+'/user', res.data)
            .then(response => {
              console.log('Profile sent to backend:', response.data);
              setProfile(response.data);
            })
            .catch(error => {
              console.error('Error sending profile to backend:', error);
            });
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  

  const logOut = async () => {
    await googleLogout();
    setUser(null);
    setProfile(null);
  };

  return {
    user,
    profile,
    login,
    logOut
  };
}

const GoogleAuthProvider = ({ children }) => {
  const googleAuth = useGoogleAuth();

  return (
    <GoogleAuthContext.Provider value={googleAuth}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

export { GoogleAuthContext, GoogleAuthProvider };
