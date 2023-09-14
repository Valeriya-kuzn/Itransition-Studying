import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from '../UI/FileUpload'; 

function NewPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [creation, setCreation] = useState('');
    const [type, setType] = useState('');
    const [file, setFile] = useState(null);

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
            console.log('Success: ', response.data); 
        })
        .catch(error => {
            console.error('Error: ', error.message);
        });

        setTitle('');
        setType('');
        setCreation('');
        setContent('');
        setFile(null);
    };

    return (
        <div className="newPost" key={'new-post-key'}>
            <h2>Add new post</h2>
            <form className = "mb-3" onSubmit={handleSubmit}>
                <input 
                    className = "form-control" 
                    type="text" 
                    value={title} 
                    placeholder='Post title' 
                    onChange={(e) => setTitle(e.target.value)} 
                />

                <select onChange={(e) => setType(e.target.value)} >
                    <option value="">-- Choose a creation --</option>
                    <option value="Movie">Movie</option>
                    <option value="Game">Game</option>
                    <option value="Book">Book</option>
                    <option value="Other">Other</option>
                </select>

                <input 
                    className = "form-control" 
                    type="text" 
                    value={creation} 
                    placeholder='Name of creation' 
                    onChange={(e) => setCreation(e.target.value)} 
                />

                <textarea 
                    className = "form-control" 
                    type="text" 
                    value={content} 
                    placeholder='Post content' 
                    onChange={(e) => setContent(e.target.value)}
                />

                <FileUpload file={file} setFile={setFile}/>
                <button className = "btn btn-light">Create new post</button>
            </form>
        </div>
    )
}

export default NewPost;