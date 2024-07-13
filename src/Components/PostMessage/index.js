import React, { useState } from 'react';

const PostMessages = () => {
  const [message, setMessage] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [posts, setPosts] = useState([]);

  const handlePostMessage = (e) => {
    e.preventDefault();
    // Handle post message logic here
    const newPost = { message, visibility };
    setPosts([...posts, newPost]);
    setMessage('');
  };

  return (
    <div>
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
        <h2>All Posts</h2>
        {posts.map((post, index) => (
          <div key={index}>
            <p>{post.message}</p>
            <p>Visibility: {post.visibility}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostMessages;
