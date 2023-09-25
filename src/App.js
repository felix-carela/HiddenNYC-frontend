import React from 'react';
import useGoogleAuth from './components/useGoogleAuth';
import Map from './components/Map'
import { useState } from 'react'
import './App.css';

function App() {
  const { user, profile, login, logOut } = useGoogleAuth();
  const [showProfile, setShowProfile] = useState(false); // Initially, don't show user profile

  return (
    <div className="container">
      <button onClick={() => setShowProfile(!showProfile)}>
        <img src="https://i.pinimg.com/736x/e6/3d/da/e63dda8f2d323e96490f761c461b4e23.jpg" alt="Google Icon" style={{ width: '40px', height: '40px' }} />
      </button>
      {showProfile && profile ? (
        <div className="profile-section">
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <button onClick={logOut}>Log out</button>
        </div>
      ) : null}
      {/* Show the map section regardless of whether the user is logged in */}
      <div className="map-section">
        <Map />
      </div>
{!profile ? (
  <div className="button-container">
    <button className="login-button" onClick={() => login()}>Sign in with Google 🚀</button>
  </div>
) : null}
    </div>
    
  );
}

export default App;