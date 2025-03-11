import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateAccountPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

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
            // Send user data to the backend
            const response = await axios.post('http://localhost:8082/api/users/register', {
                username,
                password,
                role,
            });

            // Show success message
            alert(response.data.message || 'Account created successfully!');
            setError(''); // Clear any previous errors
        } catch (err) {
            console.error("Error during registration:", err);

            // Handle specific error cases
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
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
            }}
        >
            <div
                style={{
                    padding: '2rem',
                    maxWidth: '400px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                    backgroundColor: '#fff',
                    textAlign: 'center',
                }}
            >
                <h2 style={{ marginBottom: '1rem', color: '#333' }}>Create Account</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.75rem',
                            marginBottom: '1rem',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                            fontSize: '16px',
                            boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.1)',
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
                            padding: '0.75rem',
                            marginBottom: '1rem',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                            fontSize: '16px',
                            boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.1)',
                        }}
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.75rem',
                            marginBottom: '1rem',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                            fontSize: '16px',
                        }}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button
                        type="submit"
                        style={{
                            padding: '0.75rem',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            width: '100%',
                            fontSize: '16px',
                            transition: '0.3s',
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
                    >
                        Create Account
                    </button>
                </form>
                <p style={{ marginTop: '1rem', color: '#333' }}>
                    Already have an account?{' '}
                    <Link to="/" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 'bold' }}>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default CreateAccountPage;
