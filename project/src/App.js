import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import MyReviews from './pages/MyReviews.jsx';
import Registration from './pages/Registration.jsx';
import Login from './pages/Login.jsx';
import './styles.scss';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


