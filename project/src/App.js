import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './UI/Navigation.jsx';
import Home from './pages/Home.jsx';
import Registration from './pages/Registration.jsx';
import Login from './pages/Login.jsx';
import './styles.scss';
import NewPost from './pages/NewPost.jsx';
import ViewPost from './pages/ViewPost.jsx';
import EditPost from './pages/EditPost.jsx';
import Profile from './pages/Profile.jsx';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userCookie = Cookies.get('token');
    
        if (userCookie) {
          setUser(JSON.parse(userCookie));
        }
      }, []);

    axios.defaults.withCredentials = true

    return (
        <BrowserRouter>
            <Navigation user={user} setUser={setUser}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile user={user}/>}/>
                <Route path="/new-post" element={<NewPost user={user}/>} />
                <Route path='/registration' element={<Registration user={user}/>}/>
                <Route path='/login' element={<Login user={user} setUser={setUser}/>}/>
                <Route path='/view-post/:post_id' element={<ViewPost user={user}/>}/>
                <Route path='/edit-post/:post_id' element={<EditPost user={user}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;


