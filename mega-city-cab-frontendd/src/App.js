import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BookNow from './pages/BookNow'; // Import the BookNow page
import AddBookingPage from "./components/AddBooking"; // Import the AddBookingPage
import BookingReceipt from "./components/BookingReceipt";
import BookingManagement from "./pages/BookingManagement";
import VehicleDetails from './components/VehicleDetails';
import AddBooking from './components/AddBooking';
import VehicleList from './pages/VehicleList';
import PaymentForm from "./pages/PaymentForm";
import AddVehiclePage from './pages/AddVehiclePage';
import VehicleManagementPage from './pages/VehicleManagementPage';


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
                <Route path="/" element={<AddBooking />} />
                <Route path="/receipt/:id" element={<BookingReceipt />} />
                <Route path="/admin/management" element={<BookingManagement />} />
                <Route path="/vehicle/:id" element={<VehicleDetails />} />
                <Route path="/vehicles/:category" element={<VehicleList />} />
                <Route path="/payment/:id" element={<PaymentForm />} />
                <Route path="/add-vehicle" element={<AddVehiclePage />} />
                <Route path="/manage-vehicles" element={<VehicleManagementPage />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;