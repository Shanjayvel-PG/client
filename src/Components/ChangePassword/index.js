import React, { useState } from 'react';
import './index.css';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match');
      return;
    }
    console.log('Password changed:', { currentPassword, newPassword });
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
    </form>
  );
};

export default ChangePassword;
