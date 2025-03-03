import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BookNow from './pages/BookNow'; // Import the BookNow page
import AddBookingPage from "./pages/AddBookingPage"; // Import the AddBookingPage

function App() {
    return (
        <Router>
            <Routes>
                {/* Default Home Page */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create-account" element={<CreateAccountPage />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/book-now" element={<BookNow />} /> {/* Add BookNow route */}
                <Route path="/add-booking" element={<AddBookingPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;