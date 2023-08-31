import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li key={'logo-key'}>
          <Link to="/">What's new?</Link>
        </li>
        <li key={'homepage-key'}>
          <Link to="/">Home</Link>
        </li>
        <li key={'me-reviews-key'}>
          <Link to="/my-reviews">My reviews</Link>
        </li>
        <li key={'profile-key'}>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
