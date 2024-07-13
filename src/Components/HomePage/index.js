import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css'; 

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = JSON.parse(localStorage.getItem('posts')) || [];
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="home-page-container">
      <h2>Home Page</h2>
      <div className="button-container">
        <Link to="/post-messages">
          <button>Post Message</button>
        </Link>
        <Link to="/change-password">
          <button>Change Password</button>
        </Link>
      </div>
      <div>
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          posts.map((post, index) => (
            <div key={index} className="post">
              <p className="message">{post.message}</p>
              <p className="visibility">Visibility: {post.visibility}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
