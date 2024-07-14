import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/SignupForm';
import Login from './Components/LoginForm';
import ChangePassword from './Components/ChangePassword';
import PostMessages from './Components/PostMessage';
import HomePage from './Components/HomePage';
import MyPost from './Components/MyPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-post" element={<MyPost />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/post-messages" element={<PostMessages />} />
      </Routes>
    </Router>
  );
}

export default App;
