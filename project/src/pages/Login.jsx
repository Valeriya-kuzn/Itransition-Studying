import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        console.log(formData.get('email'), formData.get('password'));

        axios.post('http://localhost:3001/backend/login', formData, {
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

        setEmail('');
        setPassword('');
    };

    return (
        <div className = 'container'>
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit}>
                <input className="form-control" type="text" placeholder="Enter e-mail" onChange={(e) => setEmail(e.target.value)}/>
                <input className="form-control" type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                <button className = "btn btn-light">Sing in</button>
            </form>
        </div>
    )
}

export default Login;