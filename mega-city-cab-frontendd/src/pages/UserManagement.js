import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For handling errors

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Fetch users from the API
    const fetchUsers = async () => {
        setLoading(true); // Show loading while fetching
        setError(null); // Reset error state
        try {
            const response = await axios.get('http://localhost:8082/api/admin/users');
            setUsers(response.data); // Store users in state
        } catch (error) {
            setError('Error fetching users: ' + error.message); // Handle error
        } finally {
            setLoading(false); // Hide loading after fetch
        }
    };

    // Delete user
    const handleDelete = async (id) => {
        const confirmation = window.confirm('Are you sure you want to delete this user?');
        if (!confirmation) return; // Exit if not confirmed
        try {
            await axios.delete(`http://localhost:8082/api/admin/users/${id}`);
            fetchUsers(); // Refresh the user list after deletion
        } catch (error) {
            alert('Error deleting user: ' + error.message); // Show error message if delete fails
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h3>User Management</h3>

            {/* Show loading spinner while fetching data */}
            {loading && <div>Loading...</div>}

            {/* Show error message if there's any */}
            {error && <div style={{ color: 'red' }}>{error}</div>}

            {/* Table for displaying users */}
            {!loading && !error && users.length > 0 && (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                    <tr style={{ backgroundColor: '#2c3e50', color: '#fff' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Username</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Role</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '10px' }}>{user.id}</td>
                            <td style={{ padding: '10px' }}>{user.username}</td>
                            <td style={{ padding: '10px' }}>{user.role}</td>
                            <td style={{ padding: '10px' }}>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    style={{
                                        backgroundColor: '#e74c3c',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* Message if no users are found */}
            {!loading && !error && users.length === 0 && (
                <div>No users found.</div>
            )}
        </div>
    );
};

export default UserManagement;
