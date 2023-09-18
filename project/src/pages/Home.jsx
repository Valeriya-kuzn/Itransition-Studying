import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';

function Home() {
    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/backend/posts');
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching post:', error);
            };
        }

        fetchPosts()

        const interval = setInterval(fetchPosts, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className = 'container' key='posts-key'>
            <h2 key='home-key'>Home Page</h2>
            {post.map(item => (
                <div className="post" key={item.id}>
                    <div className="poster">
                        {item.photo_path ? (
                            <img className="img-thumbnail" src={item.photo_path} alt={item.post_title} />
                            ) : (
                            <div>No image</div>
                            )
                        }
                    </div>
                    <div className="post-text">
                        <div className="posttitle">{item.post_title}</div>
                        <div className="postdate">{moment(item.date).format('DD.MM.YYYY')}</div>
                        <div className="postcreation">{item.post_creation}</div>
                        <div className="posttype">Category: {item.post_type}</div>
                        <div className="postcontent"><ReactMarkdown>{item.post_content}</ReactMarkdown></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
