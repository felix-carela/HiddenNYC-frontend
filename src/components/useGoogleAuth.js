import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGoogleLogin, googleLogout } from '@react-oauth/google'; 
import {createUser} from '../api/user'

function useGoogleAuth() {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();

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
          // Send profile data to backend server
          axios.post('http://localhost:4000/api/user', res.data)
            .then(response => {
              console.log('Profile sent to backend:', response.data);
            })
            .catch(error => {
              console.error('Error sending profile to backend:', error);
            });
  
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const userCheck = async( profile ) => {
    createUser(profile)
  }

  const logOut = async () => {
    console.log('LOGGED OUT')
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

export default useGoogleAuth;
