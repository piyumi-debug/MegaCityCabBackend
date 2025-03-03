import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateAccountPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
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
            alert(response.data); // Show success message
        } catch (err) {
            setError(err.response?.data || 'An error occurred');
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
                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Create Account</h2>
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
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                        display: 'block',
                        width: '100%',
                        padding: '0.5rem',
                        marginBottom: '1rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button
                    onClick={handleSubmit}
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
                    Create Account
                </button>
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Already have an account?{' '}
                    <Link to="/" style={{ color: '#2196F3', textDecoration: 'none' }}>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default CreateAccountPage;