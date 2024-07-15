import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import './index.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const jwt_token = Cookies.get("jwt_token");
        if (jwt_token) {
          try {
            const decodedToken = jwtDecode(jwt_token);
            setUsername(decodedToken.username); // Assuming the username is stored in the token under 'username'
          } catch (error) {
            console.error('Invalid token', error);
            // Handle invalid token case
          }

          const response = await fetch('http://localhost:5000/posts/public', {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt_token}`,
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch posts');
          }

          const data = await response.json();
          setPosts(data); // Assuming data is an array of posts
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Handle error state if needed
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home-page-container">
      <div className='username-con'>
        <h2>Home Page</h2>
        <h2>{username}</h2>
      </div>
      <div className="button-container">
        <Link to="/my-post">
          <button>My Post</button>
        </Link>
        <Link to="/post-messages">
          <button>Post Message</button>
        </Link>
        <Link to="/change-password">
          <button>Change Password</button>
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post">
              <p className="message">{post.content}</p>
              <p className="username">Posted by: {post.username}</p>
              <p className="visibility">Created at: {new Date(post.created_at).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
