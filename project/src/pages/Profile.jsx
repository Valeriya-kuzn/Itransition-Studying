import React, { useEffect } from 'react';
import ProfileData from '../components/ProfileData.jsx';
import MyPosts from '../components/MyPosts.jsx';
import { useNavigate } from 'react-router-dom';

function Profile({ user, token, setToken }) {
  const navigate = useNavigate();

  useEffect(() => {
        if (!user) {
            navigate('/login');
        }
  }, [navigate, user]);

  return (
      <div className = 'container' key={'my-reviews-page-key'}>
          <ProfileData user={user}/>
          <MyPosts user={user} token={token}/>
      </div>
  )
}

export default Profile;