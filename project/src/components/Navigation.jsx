import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
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
      </ul>
    </nav>
  );
}

export default Navigation;
