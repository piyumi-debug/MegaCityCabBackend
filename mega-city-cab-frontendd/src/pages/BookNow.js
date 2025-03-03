import React from 'react';
import { Link } from 'react-router-dom';

const BookNow = () => {
    // Function to handle guest booking (optional)
    const handleGuestBooking = () => {
        alert('Guest booking feature coming soon!');
        // You can redirect to a guest booking form here if implemented
    };

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>Book Now</h2>
            <p>Please log in to proceed with your booking or continue as a guest.</p>

            {/* Action Buttons */}
            <div style={{ marginTop: '2rem' }}>
                <Link to="/login">
                    <button style={buttonStyle}>Login</button>
                </Link>
                <button style={buttonStyle} onClick={handleGuestBooking}>
                    Continue as Guest
                </button>
            </div>
        </div>
    );
};

// Button Style
const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '0 0.5rem',
};

export default BookNow;
