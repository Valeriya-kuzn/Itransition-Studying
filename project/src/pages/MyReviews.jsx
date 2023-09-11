import React from 'react';
import NewPost from '../components/NewPost.jsx';
import Posts from '../components/Posts.jsx';

function MyReviews() {
  return (
    <div className = 'container' key={'my-reviews-page-key'}>
      <h2>My reviews</h2>
      <NewPost />
      <Posts />
    </div>
  )
}

export default MyReviews;