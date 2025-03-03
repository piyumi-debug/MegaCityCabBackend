// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8082/api/users/login', {
                username,
                password
            });
            console.log('Login successful:', response.data);
            // Handle successful login (store token, redirect, etc.)
        } catch (error) {
            console.error('Login failed:', error.response.data);
            alert(error.response.data.message); // Show error message to the user
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(username, password);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
