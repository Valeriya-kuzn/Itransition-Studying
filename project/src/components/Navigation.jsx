import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Logout from '../UI/Logout';

function Navigation() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/backend/access')
        .then(response => {
          setIsAuth(true);
        })
        .catch(error => {
          setIsAuth(false);
        });
  }, [isAuth]);

  return (
    <div>
      {isAuth ? (
        <nav className = "container-fluid navbar navbar-expand-lg navbar-light bg-light">
          <ul className = "navbar-nav container">
            <li className = "nav-item" key={'logo-key'}>
              <Link className = "nav-link"  to="/">What's new?</Link>
            </li>
            <li className = "nav-item" key={'homepage-key'}>
              <Link className = "nav-link" to="/">Home</Link>
            </li>
            <li className = "nav-item" key={'me-reviews-key'}>
              <Link className = "nav-link" to="/my-reviews">My reviews</Link>
            </li>
            <li className = "nav-item" key={'profile-key'}>
              <Link className = "nav-link" to="/profile">Profile</Link>
            </li>
            <li className = "nav-item" key={'logout-key'}>
              <Logout/>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className = "container-fluid navbar navbar-expand-lg navbar-light bg-light">
        <ul className = "navbar-nav container">
          <li className = "nav-item" key={'logo-key'}>
            <Link className = "nav-link"  to="/">What's new?</Link>
          </li>
          <li className = "nav-item" key={'homepage-key'}>
            <Link className = "nav-link" to="/">Home</Link>
          </li>
          <li className = "nav-item" key={'profile-key'}>
            <Link className = "nav-link" to="/login">Log in</Link>
          </li>
        </ul>
      </nav>
      )}
    </div>
  );
}

export default Navigation;
