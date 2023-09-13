import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
      axios.get('http://localhost:3001/backend/access')
          .then(response => {
              setUser(response.data);
          })
          .catch(error => {
              navigate('/login');
          });
  }, [navigate]);

  if (!user) {
      return <div>Loading...</div>;
  }
  
  return (
      <div className = 'container' key={'profile-page-key'}>
          <h2>Profile</h2>
          <form>
              <label htmlFor="username">User name</label>
              <input type="text" value={user.user_name} id="username" disabled/>
              <label htmlFor="usermail">Email</label>
              <input type="email" value={user.user_email} id="usermail" disabled/>
              <label htmlFor="userid">User ID</label>
              <input type="text" value={user.user_id} id="userid" disabled/>
          </form>
      </div>
  );
}

export default Profile;