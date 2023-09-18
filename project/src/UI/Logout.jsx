import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout({user, setUser}) {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('user');
        setUser(null);
    }

    const logOut = () => {
        axios.post('http://localhost:3001/backend/logout')
        .then(response => {
            handleLogout();
            navigate('/login');
        })
        .catch(error => {
            handleLogout();
            console.log(error);
        });
    }

    return (<div className = 'nav-link' onClick={logOut}>Log out</div>)
}

export default Logout;