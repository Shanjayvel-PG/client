// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import Signup from './Components/SignupForm';
import Login from './Components/LoginForm';
import ChangePassword from './Components/ChangePassword';
import PostMessages from './Components/PostMessage';
import HomePage from './Components/HomePage';
import MyPost from './Components/MyPost';
import ProtectedRoute from './Components/protectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={HomePage} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ProtectedRoute element={ChangePassword} />} />
        <Route path="/post-messages" element={<ProtectedRoute element={PostMessages} />} />
        <Route path="/my-post" element={<ProtectedRoute element={MyPost} />} />
      </Routes>
    </Router>
  );
}

export default App;
