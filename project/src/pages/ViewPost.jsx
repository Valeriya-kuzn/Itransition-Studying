import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

function ViewPost({ user }) {
    const location = useLocation();
    const { post_id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        if (location.state && location.state.post) {
            setPost(location.state.post);
        } else {
            axios.get(`http://localhost:3001/backend/view-post/${post_id}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.error('Error', error);
            });
        }
    }, [location.state, post_id]);

    if (!post) {
        return <div className = 'container'>Loading...</div>;
    }

    return (
        <div className = 'container'>
            <h2  className="posttitle" key='post-key'>{post.post_title}</h2>
            <div className="post" key={post.post_id}>
                <div className="poster">
                    {post.photo_path ? (
                        <img className="img-thumbnail" src={post.photo_path} alt={post.post_title} />
                        ) : (
                        <div>No image</div>
                        )
                    }
                </div>
                <div className="post-text">
                    <div className="postcreation">{post.post_creation}</div>
                    <div className="posttype">Category: {post.post_type}</div>
                    <div className="postcontent"><ReactMarkdown>{post.post_content}</ReactMarkdown></div>
                    <div className="postauthor">Author: {post.user_id}</div>
                    <div className="postdate">{moment(post.date).format('DD.MM.YYYY')}</div>
                </div>
            </div>
            {user.user_id === post.user_id ? (
                <div>
                    <Link className = "btn btn-primary ml-2" to="/profile" title='Click to go to your profile page'>Go to profile</Link>
                    <Link className="btn btn-secondary ml-2" to={`/edit-post/${post.post_id}`} state={{post : post}}>
                    Edit
                    </Link>
                </div>
            ) : (
                <Link className = "btn btn-primary ml-2" to="/" title='Click to go to home page'>Go to home page</Link>
            )}
        </div>
    );
}

export default ViewPost;