import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const logOut = () => {
        axios.post('http://localhost:3001/backend/logout')
        .then(response => {
            console.log('Success: ', response.data);
            navigate('/login');
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (<div className = 'nav-link' onClick={logOut}>Log out</div>)
}

export default Logout;