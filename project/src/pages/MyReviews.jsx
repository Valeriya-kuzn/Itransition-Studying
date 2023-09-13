import React, { useEffect } from 'react';
import axios from 'axios';
import NewPost from '../components/NewPost.jsx';
import Posts from '../components/Posts.jsx';
import { useNavigate } from 'react-router-dom';

function MyReviews() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/backend/access')
        .then(response => {
            
        })
        .catch(error => {
            navigate('/login');
        });
  }, [navigate]);

  return (
    <div className = 'container' key={'my-reviews-page-key'}>
      <h2>My reviews</h2>
      <NewPost />
      <Posts />
    </div>
  )
}

export default MyReviews;