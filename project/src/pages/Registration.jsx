import React, { useState } from 'react';
import axios from 'axios';

function Registration() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);

        axios.post('http://localhost:3001/backend/registration', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('Success: ', response.data); 
        })
        .catch(error => {
            console.error('Error: ', error.message);
        });

        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <div>
            <h2>Registration form</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter name" title="It will show on your page" onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder="Enter e-mail" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                <button>Sing up</button>
            </form>
        </div>
    )
}

export default Registration;