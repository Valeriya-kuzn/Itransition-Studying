import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.defaults.withCredentials = true;
        axios.defaults.credentials = 'include';

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
            navigate('/my-reviews');
        })
        .catch(error => {
            console.log(error);
            navigate('/login');
        });

        setEmail('');
        setPassword('');
    };

    return (
        <div className = 'container'>
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit}>
                <input className = "form-control" type="email" placeholder="Enter e-mail" onChange={(e) => setEmail(e.target.value)}/>
                <input className = "form-control" type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                <button className = "btn btn-light">Sing in</button>
            </form>
            <div>
                <div>Don't have an account?</div>
                <Link className = "btn btn-light" to="/registration">Sign up</Link>
            </div>
        </div>
    )
}

export default Login;