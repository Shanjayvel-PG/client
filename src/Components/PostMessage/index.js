import React, { useState } from 'react';
import './index.css';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from "react-router-dom";

const PostMessages = () => {
  const [message, setMessage] = useState('');
  const [visibility, setVisibility] = useState('public');
  let navigate = useNavigate();


  const handlePostMessage = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/posts";
    const jwt_token = Cookies.get("jwt_token");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt_token}`,
      },
      body: JSON.stringify({ content: message, isPublic: visibility === "public" ? true : false }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        alert("Post created successfully:")
        navigate("/")
      
      } else {
        console.error("Failed to create post:", data.error_msg);
       
      }
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error, e.g., show an error message to the user
    }
  };




  return (
    <div className="post-messages-container">
      <form onSubmit={handlePostMessage}>
        <h2>Post Message</h2>
        <textarea
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <button type="submit">Post</button>
      </form>
      <div>
      </div>
    </div>
  );
};

export default PostMessages;
