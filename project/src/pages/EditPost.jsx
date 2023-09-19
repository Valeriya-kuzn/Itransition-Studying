import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPost({ user }) {
    const location = useLocation();
    const { post_id } = useParams();
    const { post } = location.state || {};
    const titleInitialValue = post ? post.post_title : ''; 
    const contentInitialValue = post ? post.post_content : '';
    const creationInitialValue = post ? post.post_creation : '';
    const typeInitialValue = post ? post.post_type : ''
    const [title, setTitle] = useState(titleInitialValue);
    const [content, setContent] = useState(contentInitialValue);
    const [creation, setCreation] = useState(creationInitialValue);
    const [type, setType] = useState(typeInitialValue);
    const [file, setFile] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const [postStatus, setPostStatus] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('type', type);
        formData.append('creation', creation);
        formData.append('content', content);
        formData.append('file', file);

        axios.post(`https://course-project-e5ui.onrender.com/backend/edit-post/${post_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            if (response.success === false) {
                setPostStatus(response.data.status);
            } else {
            navigate(`/view-post/${post_id}`);
            }
        })
        .catch(error => {
            navigate('/');
            console.error('Error: ', error.message);
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setImageURL(URL.createObjectURL(e.target.files[0]));
    };

    const deleteFile = (e) => {
        setFile(null);
        setImageURL('');
    };

    useEffect(() => {
        if (!user || !post) {
            navigate('/');
        } else if (user.user_id !== post.user_id) {
            navigate('/');
        }
    }, [navigate, user, post]);

    if (!post) {
        return <div className = 'container'>Loading...</div>;
    }

    return (
        <div className = 'container'>
            <h2  key='post-key'>Editing the post</h2>
            <div className="post" key={post.post_id}>
                <div className='photo-edit'>
                    <div className="poster">
                        {file ? (
                            <img className="img-thumbnail" src={imageURL} alt="Selected" />
                        ) : (
                            post.photo_path ? (
                                <img className="img-thumbnail" src={post.photo_path} alt={post.post_title} />
                            ) : (
                                <div>No image</div>
                            )
                        )}
                    </div>
                    
                    <div className='profileButtons'>
                        <label htmlFor="file-input" className="form-label">
                            <p className="form-label btn btn-light">Click here to change photo</p>
                        </label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".jpg, .jpeg, .png"
                            style={{ display: 'none' }}
                            id="file-input"
                        />
                        {file ? (
                            <button className="btn btn-light" onClick={deleteFile}>Cancel upload</button>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>

                <form  className = "postEdit">
                <label htmlFor="postTitle" title='Describe the main idea of you post in few words'>Post title</label>
                <input 
                    className = "form-control" 
                    type="text" 
                    value={title}
                    placeholder='Post title'
                    id='postTitle'
                    title='Describe the main idea of you post in few words'
                    required
                    onChange={(e) => setTitle(e.target.value)} 
                />

                <label htmlFor="postType" title='Enter the type of the creation'>Type of creation</label>
                <div><select onChange={(e) => setType(e.target.value)} id='postType' required value={type}>
                    <option value="">-- Choose a creation --</option>
                    <option value="Movie">Movie</option>
                    <option value="Game">Game</option>
                    <option value="Book">Book</option>
                    <option value="Other">Other</option>
                </select></div>

                <label htmlFor="postName" title='Enter the name of the creation'>Name of creation</label>
                <input 
                    className = "form-control" 
                    type="text"
                    value={creation} 
                    placeholder='Name of creation'
                    id='postName'
                    title='Enter the name of creation'
                    required
                    onChange={(e) => setCreation(e.target.value)} 
                />

                <label htmlFor="postContent" title='Enter your impressions of the creation'>Your review</label>
                <textarea 
                    className = "form-control" 
                    type="text" 
                    value={content} 
                    placeholder='Your review' 
                    id='postContent'
                    title='Enter the name of the creation'
                    required
                    onChange={(e) => setContent(e.target.value)}
                />

                <div className='profileButtons'>
                    <button className="btn btn-primary ml-2" onClick={handleSubmit}>Submit</button>
                    <button className="btn btn-danger"><Link to={`/view-post/${post_id}`} title='Click to cancel editing'>Cancel</Link></button>
                </div>
            </form>

            <div><p>{postStatus}</p></div>
            </div>
        </div>
    );
}

export default EditPost;