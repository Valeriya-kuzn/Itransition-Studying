import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

function Navigation({user, setUser}) {
    return (
        <div>
            {user ? (
                <nav className = "container-fluid navbar navbar-expand-lg navbar-light bg-light">
                    <ul className = "navbar-nav container">
                        <li className = "nav-item" key={'homepage-key'}>
                            <Link className = "nav-link" to="/">Home</Link>
                        </li>
                        <li className = "nav-item" key={'me-reviews-key'}>
                            <Link className = "nav-link" to="/profile">Profile</Link>
                        </li>
                        <li className = "nav-item" key={'logout-key'}>
                            <Logout user={user} setUser={setUser}/>
                        </li>
                    </ul>
                </nav>
            ) : (
              <nav className = "container-fluid navbar navbar-expand-lg navbar-light bg-light">
              <ul className = "navbar-nav container">
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
