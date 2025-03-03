import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav
            style={{
                padding: '1rem',
                backgroundColor: '#2196F3',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <div>
                <Link to="/user-dashboard" style={{ margin: '0 1rem', color: 'white', textDecoration: 'none' }}>
                    Dashboard
                </Link>
                <Link to="/add-booking" style={{ margin: '0 1rem', color: 'white', textDecoration: 'none' }}>
                    Add Booking
                </Link>
            </div>
            <div>
                <Link to="/" style={{ margin: '0 1rem', color: 'white', textDecoration: 'none' }}>
                    Logout
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;