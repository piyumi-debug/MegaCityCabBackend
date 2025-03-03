import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchPendingBookings();
    }, []);

    const fetchPendingBookings = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/bookings?status=pending`);
            setBookings(response.data);
        } catch (error) {
            console.error("Error fetching pending bookings:", error);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/bookings/${id}/status`, null, {
                params: { status },
            });
            fetchPendingBookings(); // Refresh the list
        } catch (error) {
            console.error("Error updating booking status:", error);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h3>User Booking Requests</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                <tr style={{ backgroundColor: "#f5f5f5" }}>
                    <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Customer</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Destination</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Date</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {bookings.map((booking) => (
                    <tr key={booking.id} style={{ borderBottom: "1px solid #ddd" }}>
                        <td style={{ padding: "10px" }}>{booking.id}</td>
                        <td style={{ padding: "10px" }}>{booking.customerName}</td>
                        <td style={{ padding: "10px" }}>{booking.dropLocation}</td>
                        <td style={{ padding: "10px" }}>{booking.date}</td>
                        <td style={{ padding: "10px" }}>
                            <button
                                onClick={() => handleUpdateStatus(booking.id, "confirmed")}
                                style={{
                                    backgroundColor: "#2ecc71",
                                    color: "#fff",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    marginRight: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => handleUpdateStatus(booking.id, "declined")}
                                style={{
                                    backgroundColor: "#e74c3c",
                                    color: "#fff",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Decline
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingManagement;