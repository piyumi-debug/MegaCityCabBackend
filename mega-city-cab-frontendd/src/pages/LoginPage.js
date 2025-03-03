import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        // Validate inputs
        if (!username.trim()) {
            setError('Username field is empty');
            return;
        }
        if (!password.trim()) {
            setError('Password field is empty');
            return;
        }
        if (!/^[a-zA-Z]+$/.test(username)) {
            setError('Username must contain only letters');
            return;
        }
        if (!/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(password)) {
            setError('Password must contain letters and numbers');
            return;
        }

        try {
            console.log("Sending login request with:", { username, password });
            const response = await axios.post('http://localhost:8080/api/users/login', {
                username: username.trim(),
                password: password.trim(),
            });
            console.log("Login response:", response.data);
            const { message, role } = response.data;
            alert(message); // Show success message

            // Redirect based on role
            if (role === 'admin') {
                navigate('/admin-dashboard'); // Redirect to admin dashboard
            } else if (role === 'user') {
                navigate('/user-dashboard'); // Redirect to user dashboard
            } else {
                setError('Unknown role');
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            <div
                style={{
                    padding: '2rem',
                    maxWidth: '400px',
                    border: '2px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fff',
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Login</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                        display: 'block',
                        width: '100%',
                        padding: '0.5rem',
                        marginBottom: '1rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        display: 'block',
                        width: '100%',
                        padding: '0.5rem',
                        marginBottom: '1rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                />
                <button
                    onClick={handleLogin}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%',
                    }}
                >
                    Login
                </button>
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Don't have an account?{' '}
                    <a href="/create-account" style={{ color: '#2196F3', textDecoration: 'none' }}>
                        Create Account
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
