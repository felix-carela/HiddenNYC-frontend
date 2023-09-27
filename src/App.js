import React, { useState }  from 'react';
import {Link} from 'react-router-dom'
import useGoogleAuth from './components/useGoogleAuth';
import Map from './components/Map'
import './App.css';

function App() {
  const { user, profile, login, logOut } = useGoogleAuth();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="container">
      {user&&
            <button
              className={`hamburger-button ${showProfile ? 'active' : ''}`}
              onClick={() => setShowProfile(!showProfile)}
            >
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </button>
          }
      {showProfile && profile ? (
            <div className="profile-section">
              <h3>User Logged in</h3>
              <p>Name: {profile.name}</p>
              <p>Email: {profile.email}</p>
              <button onClick={logOut}>Log out</button>
            </div>
          ) : null}
      <div className="map-section">
        <Map user={user} profile={profile}/>
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