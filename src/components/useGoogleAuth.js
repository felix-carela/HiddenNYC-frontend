import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGoogleLogin, googleLogout } from '@react-oauth/google'; 

function useGoogleAuth() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

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
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
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

export default useGoogleAuth;
