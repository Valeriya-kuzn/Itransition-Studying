import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from '../UI/FileUpload'; 

function NewPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);

    const handleFileUpload = (file) => {
        setFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // const sendPost = {
        //     post_title : title, 
        //     post_content : content,
        // };

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('file', file);

        axios.post('http://localhost:3001/backend/newpost', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log('Success: ', response.data); 
                // if (file) {
                //     axios.post('http://localhost:3001/backend/upload', formData)
                //     .then(response => {
                //         console.log('Success: ', response.data);
                //     })
                //     .catch(error => {
                //         console.error('Error: ', error.message);
                //     });
                // }
            })
            .catch(error => {
                console.error('Error: ', error.message);
            });

        setTitle('');
        setContent('');
        setFile(null);
    };

    return (
        <div className="newPost" key={'new-post-key'}>
            <h2>Add new post</h2>
            <form  onSubmit={handleSubmit}  id="formElem">
                <input type="text" value={title} placeholder='Post title' onChange={(e) => setTitle(e.target.value)} />
                <textarea type="text" value={content} placeholder='Post content' onChange={(e) => setContent(e.target.value)} />
                <FileUpload onFileUpload={handleFileUpload}/>
                <button>Create new post</button>
            </form>
        </div>
    )
}

export default NewPost;