import React, { useEffect, useState  } from 'react';
import axios from 'axios';
import Profile from '../components/Profile.jsx';
import MyPosts from '../components/MyPosts.jsx';
import { useNavigate} from 'react-router-dom';

function MyReviews() {
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

  return (
      <div className = 'container' key={'my-reviews-page-key'}>
          <Profile user={user}/>
          <MyPosts />
      </div>
  )
}

export default MyReviews;