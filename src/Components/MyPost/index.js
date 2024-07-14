import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import Cookies from 'js-cookie';
import {  useNavigate } from 'react-router-dom';

const MyPost = () => {
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const handleLogout = () => {
    Cookies.remove("jwt_token")
    navigate("/login")
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const jwt_token = Cookies.get("jwt_token");
        const response = await fetch('http://localhost:5000/posts/my-posts', {
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
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Handle error state if needed
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="home-page-container">
      <h2>Home Page</h2>
      <div className="button-container">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/post-messages">
          <button>Post Message</button>
        </Link>

        <Link to="/change-password">
          <button>Change Password</button>
        </Link>
        <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      </div>
      <div>
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
            posts.map((post) => (
              <div key={post.id} className="post">
                <p className="message">{post.content}</p>
                <p className="username">Post Type: {post.is_public === 1 ?  "Public" : "Private"}</p>

                <p className="visibility">Created at: {new Date(post.created_at).toLocaleString()}</p>
              </div>
            ))
        )}
      </div>
    </div>
  );
};


export default MyPost;
