import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BookingManagement from './BookingManagement';
import UserManagement from './UserManagement';


const AdminDashboard = () => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('dashboard');

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Assuming token is stored in localStorage
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <div
                style={{
                    width: '250px',
                    backgroundColor: '#2c3e50',
                    color: '#fff',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Admin Panel</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '10px' }}>
                            <Link
                                to="#"
                                style={{ color: '#fff', textDecoration: 'none' }}
                                onClick={() => setSelectedTab('users')}
                            >
                                User Management
                            </Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <Link
                                to="#"
                                style={{ color: '#fff', textDecoration: 'none' }}
                                onClick={() => setSelectedTab('bookings')}
                            >
                                Booking Management
                            </Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <Link
                                to="#"
                                style={{ color: '#fff', textDecoration: 'none' }}
                                onClick={() => setSelectedTab('analytics')}
                            >
                                Analytics and Reports
                            </Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <Link
                                to="#"
                                style={{ color: '#fff', textDecoration: 'none' }}
                                onClick={() => setSelectedTab('settings')}
                            >
                                System Settings
                            </Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <Link
                                to="#"
                                style={{ color: '#fff', textDecoration: 'none' }}
                                onClick={() => setSelectedTab('notifications')}
                            >
                                Notifications
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    style={{
                        backgroundColor: '#e74c3c',
                        color: '#fff',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        width: '100%',
                    }}
                >
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '20px', backgroundColor: '#f4f4f4' }}>
                {selectedTab === 'dashboard' && (
                    <>
                        <h2>Welcome to the Admin Dashboard</h2>
                        <p>Manage users, bookings, and view analytics here.</p>
                    </>
                )}
                {selectedTab === 'users' && <UserManagement />}
                {selectedTab === 'bookings' && <BookingManagement />}
            </div>
        </div>
    );
};

export default AdminDashboard;