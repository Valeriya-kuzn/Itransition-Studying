import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Posts() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, []);

  return (
    <div>
      {post.map(item => (
        <div className="post" key={item.id}>
          <div className="posttitle">{item.title}</div>
          <div className="postcontent">{item.body}</div>
        </div>
      ))}
    </div>
  );
}

export default Posts;