import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Posts() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/backend/posts')
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, []);

  return (
    <div key='posts-key'>
      {post.map(item => (
        <div className="post" key={item.id}>
          <div className="poster">
            <img src={item.photo_path} alt={item.post_title} />
          </div>
          <div className="post-text">
            <div className="posttitle">{item.post_title}</div>
            <div className="postcontent">{item.post_content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;