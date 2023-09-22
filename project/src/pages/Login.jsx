import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login({ user, setUser, token, setToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    }, [navigate, user]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.defaults.withCredentials = true;
        axios.defaults.credentials = 'include';

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        axios.post('https://course-project-e5ui.onrender.com/backend/login', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('login response: ', response);
            const receivedToken = Cookies.get('token');
            setToken(receivedToken);
            Cookies.set('token', JSON.stringify(receivedToken), { expires: 7 });
            setUser(response.data.user);
            navigate('/profile');
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
                <Link className = "btn btn-light shortlink" to="/registration">Sign up</Link>
            </div>
        </div>
    )
}

export default Login;