import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      axios.get('http://localhost:3001/backend/profile')
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
  
  return <h2 className = 'container' key={'profile-page-key'}>Profile</h2>;
}

export default Profile;