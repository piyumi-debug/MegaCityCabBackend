import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserManagement from './UserManagement';
import BookingManagement from './BookingManagement';
import AddVehicleForm from '../components/AddVehicleForm';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('dashboard');
    const [bookings, setBookings] = useState([]); // State to hold pending bookings
    const [showAddVehicleForm, setShowAddVehicleForm] = useState(false);
    const [notifications, setNotifications] = useState([]); // Store new booking notifications
    const [unreadCount, setUnreadCount] = useState(0); // Count of unread notifications
    const [paymentSlips, setPaymentSlips] = useState([]); // State for payment slips

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Assuming token is stored in localStorage
        navigate('/login');
    };

    // Fetch pending bookings when the component mounts
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get("http://localhost:8082/api/bookings/pending");
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };
        fetchBookings();
    }, []);

    // Fetch new booking notifications every 10 seconds
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get("http://localhost:8082/api/bookings/new");
                setNotifications(response.data);
                setUnreadCount(response.data.length);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        const interval = setInterval(fetchNotifications, 10000); // Fetch every 10 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // Fetch payment slips for the admin dashboard
    useEffect(() => {
        const fetchPaymentSlips = async () => {
            try {
                const response = await axios.get("http://localhost:8082/api/payments/slips");
                setPaymentSlips(response.data);
            } catch (error) {
                console.error("Error fetching payment slips:", error);
            }
        };
        fetchPaymentSlips();
    }, []);

    // Inside the `paymentslips` tab:
    {paymentSlips.length > 0 ? (
        <ul>
            {paymentSlips.map((slip, index) => (
                <li key={index}>
                    <p><strong>Payment ID:</strong> {slip.paymentId}</p>
                    <p><strong>Amount:</strong> {slip.amount}</p>
                    <p><strong>Date:</strong> {slip.date}</p>
                    <img src={`http://localhost:8082/${slip.fileUrl}`} alt="Payment Slip" style={{ maxWidth: '100%' }} />
                </li>
            ))}
        </ul>
    ) : (
        <p>No payment slips available.</p>
    )}


    // Mark notifications as read
    const markNotificationsAsRead = () => {
        setUnreadCount(0);
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
                                Add Vehicles
                            </Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <Link
                                to="#"
                                style={{ color: '#fff', textDecoration: 'none' }}
                                onClick={() => setSelectedTab('settings')}
                            >
                                Help
                            </Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <Link
                                to="#"
                                style={{ color: '#fff', textDecoration: 'none' }}
                                onClick={() => setSelectedTab('paymentslips')}
                            >
                                Payment Slips
                            </Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <Link
                                to="#"
                                style={{ color: '#fff', textDecoration: 'none' }}
                                onClick={() => setSelectedTab('notifications')}
                            >
                                Notifications
                                {unreadCount > 0 && (
                                    <span
                                        style={{
                                            backgroundColor: 'red',
                                            color: 'white',
                                            borderRadius: '50%',
                                            padding: '5px',
                                            fontSize: '12px',
                                            marginLeft: '10px',
                                        }}
                                    >
                                        {unreadCount}
                                    </span>
                                )}
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
                {selectedTab === 'bookings' && (
                    <div>
                        <h2>Manage Bookings</h2>
                        {bookings.length > 0 ? (
                            <ul>
                                {bookings.map((booking) => (
                                    <li key={booking.id}>
                                        <p><strong>Name:</strong> {booking.name}</p>
                                        <p><strong>Email:</strong> {booking.email}</p>
                                        <p><strong>Status:</strong> {booking.status}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No bookings available.</p>
                        )}
                        <BookingManagement />
                    </div>
                )}
                {selectedTab === 'paymentslips' && (
                    <div>
                        <h2>Payment Slips</h2>
                        {paymentSlips.length > 0 ? (
                            <ul>
                                {paymentSlips.map((slip, index) => (
                                    <li key={index}>
                                        <p><strong>Payment ID:</strong> {slip.paymentId}</p>
                                        <p><strong>Amount:</strong> {slip.amount}</p>
                                        <p><strong>Date:</strong> {slip.date}</p>
                                        <img src={slip.url} alt="Payment Slip" style={{ maxWidth: '100%' }} />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No payment slips available.</p>
                        )}
                    </div>
                )}

                {/* Analytics and Reports Section */}
                {selectedTab === 'analytics' && (
                    <div>
                        <h2>Add Vehicles and Drivers</h2>
                        <p>View system analytics and generate reports here.</p>

                        {/* Add Vehicle Button */}
                        <button
                            onClick={() => setShowAddVehicleForm(!showAddVehicleForm)}
                            style={{
                                backgroundColor: '#27ae60',
                                color: '#fff',
                                border: 'none',
                                padding: '10px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginBottom: '15px',
                            }}
                        >
                            {showAddVehicleForm ? 'Close Add Vehicle Form' : 'Add New Vehicle'}
                        </button>

                        {/* Show AddVehicleForm when toggled */}
                        {showAddVehicleForm && <AddVehicleForm />}
                    </div>
                )}

                {/* Help Section */}
                {selectedTab === 'settings' && (
                    <div>
                        <h2>Help & Support</h2>
                        <p>Here you can find answers to common issues and get assistance.</p>

                        <h3>Frequently Asked Questions</h3>
                        <ul>
                            <li><strong>How do I add a new user?</strong> - Go to the User Management tab and click "Add User".</li>
                            <li><strong>How do I approve bookings?</strong> - Visit the Booking Management section.</li>
                            <li><strong>What should I do if I encounter an error?</strong> - Check the error message and contact support.</li>
                        </ul>

                        <h3>Contact Support</h3>
                        <p>If you need further assistance, reach out to our support team:</p>
                        <p>Email: <a href="mailto:support@megacitycab.com">support@megacitycab.com</a></p>
                        <p>Phone: +94 11 234 5678</p>

                        <h3>Report an Issue</h3>
                        <textarea
                            placeholder="Describe your issue here..."
                            style={{
                                width: '100%',
                                height: '100px',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                            }}
                        ></textarea>
                        <button
                            style={{
                                marginTop: '10px',
                                backgroundColor: '#2196F3',
                                color: 'white',
                                padding: '10px 15px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
