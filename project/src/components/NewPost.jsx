import React, { useState } from 'react';

function NewPost() {
    const [title, setTitle] = useState('');
    const [context, setContext] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь можно добавить логику для отправки данных на сервер
        console.log('New post', { title, context });
        setTitle('');
        setContext('');
    };

    return (
        <div className="newPost">
            <h2>Add new post</h2>
            <form  onSubmit={handleSubmit}>
                <input type="text" value={title} placeholder='Post title' onChange={(e) => setTitle(e.target.value)} />
                <textarea type="text" value={context} placeholder='Post content' onChange={(e) => setContext(e.target.value)} />
                <button>Create new post</button>
            </form>
        </div>
    )
}

export default NewPost;