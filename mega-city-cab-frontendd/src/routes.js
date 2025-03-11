import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import HomePage from './pages/HomePage';
import VehicleList from './pages/VehicleList';
import CreateAccountPage from './pages/CreateAccountPage'; // We'll create this next

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/vehicles/:category" element={<VehicleList />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/create-account" element={<CreateAccountPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;