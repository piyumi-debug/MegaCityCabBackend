import React, { useState } from 'react';
import axios from 'axios';

const ProfileManagement = () => {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleUpdateProfile = async () => {
        try {
            await axios.put('http://localhost:8082/api/users/update-profile/USER_ID', { username });
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleChangePassword = async () => {
        try {
            await axios.put('http://localhost:8082/api/users/change-password/USER_ID', { newPassword });
            alert('Password changed successfully');
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h3>Profile Management</h3>

            {/* Update Profile */}
            <div style={{ marginBottom: '20px' }}>
                <h4>Update Profile</h4>
                <input
                    type="text"
                    placeholder="New Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ padding: '5px' }}
                />
                <button
                    onClick={handleUpdateProfile}
                    style={{
                        padding: '5px 10px',
                        backgroundColor: '#2ecc71',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Save
                </button>
            </div>

            {/* Change Password */}
            <div>
                <h4>Change Password</h4>
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ padding: '5px' }}
                />
                <button
                    onClick={handleChangePassword}
                    style={{
                        padding: '5px 10px',
                        backgroundColor: '#3498db',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default ProfileManagement;