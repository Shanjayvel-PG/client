// HomePage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from a backend or global state
  useEffect(() => {
    // Example: Fetching posts from a local storage or API
    const fetchPosts = async () => {
      // Replace this with your actual data fetching logic
      const fetchedPosts = JSON.parse(localStorage.getItem('posts')) || [];
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Home Page</h2>
      <div>
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
              <p>{post.message}</p>
              <p>Visibility: {post.visibility}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
