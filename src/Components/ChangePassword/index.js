import React, { useState } from 'react';
import './index.css';
import Cookies from 'js-cookie';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    if (newPassword !== confirmNewPassword) {
      setMessage('New passwords do not match');
      return;
    }

    const token = Cookies.get('jwt_token');
    if (!token) {
      setMessage('Unauthorized: No token found');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/users/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: currentPassword,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || 'Failed to change password');
        return;
      }

      setMessage(data.message || 'Password changed successfully');
    } catch (error) {
      console.error('Error during password change:', error);
      setMessage('An error occurred while changing the password');
    }
  };

  return (
    <form className="change-password-form" onSubmit={handleChangePassword}>
      <h2>Change Password</h2>
      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        required
      />
      <button type="submit">Change Password</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ChangePassword;
