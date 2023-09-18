import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from '../UI/FileUpload';
import { Link } from 'react-router-dom';

function NewPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [creation, setCreation] = useState('');
    const [type, setType] = useState('');
    const [file, setFile] = useState(null);
    const [postStatus, setPostStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('type', type);
        formData.append('creation', creation);
        formData.append('content', content);
        formData.append('file', file);

        axios.post('http://localhost:3001/backend/newpost', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setPostStatus(response.data.status)
            console.log(response.data); 
        })
        .catch(error => {
            setPostStatus('Error. Try again later.')
            console.error('Error: ', error.message);
        });

        setTitle('');
        setType('');
        setCreation('');
        setContent('');
        setFile(null);
        setPostStatus('')
    };


    return (
        <div className="container" key={'new-post-key'}>
            <h2>Add new post</h2>
            <form className = "mb-3" onSubmit={handleSubmit}>
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
                <div><select onChange={(e) => setType(e.target.value)} id='postType' required>
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

                <FileUpload file={file} setFile={setFile}/>
                <button className = "btn btn-light" title='Click to create new post'>Create new post</button>
            </form>
            <div><p>{postStatus}</p></div>
            <Link className = "btn btn-light" to="/profile" title='Click to back to your profile'>Back to profile</Link>
        </div>
    )
}

export default NewPost;