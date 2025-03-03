import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserDashboard = () => {
    const [bookings, setBookings] = useState([]);

    // Fetch bookings on component load
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/bookings`);
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };
        fetchBookings();
    }, []);

    return (
        <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
            <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Welcome to Your Dashboard</h2>
            <p style={{ fontSize: "1.2rem", textAlign: "center", color: "#555" }}>
                Here, you can manage your bookings, view details, and more.
            </p>

            {/* Action Buttons */}
            <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <Link to="/add-booking">
                    <button
                        style={{
                            padding: "0.75rem 1.5rem",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginRight: "1rem",
                        }}
                    >
                        Add New Booking
                    </button>
                </Link>
                <button
                    style={{
                        padding: "0.75rem 1.5rem",
                        backgroundColor: "#2196F3",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    View Bookings
                </button>
            </div>

            {/* Booking History Table */}
            <h3 style={{ marginTop: "2rem" }}>Booking History</h3>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    border: "1px solid #ccc",
                    textAlign: "left",
                }}
            >
                <thead>
                <tr style={{ backgroundColor: "#f5f5f5" }}>
                    <th style={{ padding: "0.75rem", border: "1px solid #ccc" }}>ID</th>
                    <th style={{ padding: "0.75rem", border: "1px solid #ccc" }}>Destination</th>
                    <th style={{ padding: "0.75rem", border: "1px solid #ccc" }}>Date</th>
                    <th style={{ padding: "0.75rem", border: "1px solid #ccc" }}>Status</th>
                </tr>
                </thead>
                <tbody>
                {bookings.map((booking) => (
                    <tr key={booking.id}>
                        <td style={{ padding: "0.75rem", border: "1px solid #ccc" }}>{booking.id}</td>
                        <td style={{ padding: "0.75rem", border: "1px solid #ccc" }}>{booking.dropLocation}</td>
                        <td style={{ padding: "0.75rem", border: "1px solid #ccc" }}>{booking.date}</td>
                        <td style={{ padding: "0.75rem", border: "1px solid #ccc" }}>
                            {booking.status === "pending" && <span>Pending Admin Confirmation</span>}
                            {booking.status === "confirmed" && <span>Booking Confirmed</span>}
                            {booking.status === "declined" && <span>Booking Not Available This Time, Thank You!</span>}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserDashboard;