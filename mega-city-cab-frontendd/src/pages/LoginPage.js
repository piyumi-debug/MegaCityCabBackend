import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

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
            const response = await axios.post('http://localhost:8082/api/users/login', {
                username: username.trim(),
                password: password.trim(),
            });
            console.log("Login response:", response.data);

            const { message, role } = response.data;
            alert(message);

            if (role === 'admin') {
                navigate('/admin-dashboard');
            } else if (role === 'user') {
                navigate('/user-dashboard');
            } else {
                setError('Unknown role');
            }
        } catch (err) {
            console.error("Error during login:", err);

            if (err.response) {
                setError(err.response.data.message || 'An error occurred');
            } else if (err.request) {
                setError('No response received from the server. Please check your connection.');
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <div
                style={{
                    padding: '2rem',
                    width: '350px',
                    borderRadius: '10px',
                    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                    backgroundColor: '#ffffff',
                    textAlign: 'center',
                }}
            >
                <h2 style={{ marginBottom: '1rem', color: '#333' }}>Login</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            fontSize: '16px',
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            fontSize: '16px',
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#5c67f2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            transition: '0.3s',
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = '#4a54e1')}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#5c67f2')}
                    >
                        Login
                    </button>
                </form>
                <p style={{ marginTop: '10px' }}>
                    Don't have an account?{' '}
                    <a href="/create-account" style={{ color: '#5c67f2', textDecoration: 'none' }}>
                        Create Account
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
