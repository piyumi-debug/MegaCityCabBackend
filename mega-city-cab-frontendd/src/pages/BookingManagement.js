import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get("http://localhost:8082/api/bookings");
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };
        fetchBookings();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:8082/api/bookings/${id}`, null, { params: { status } });
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.id === id ? { ...booking, status } : booking
                )
            );
        } catch (error) {
            console.error("Error updating booking status:", error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Booking Management</h2>
            <ul style={styles.list}>
                {bookings.map((booking) => (
                    <li key={booking.id} style={styles.bookingItem}>
                        <p><strong>Customer Name & Vehicle ID:</strong> {booking.customerName}</p>
                        <p><strong>Pickup Location:</strong> {booking.pickupLocation}</p>
                        <p><strong>Drop Location:</strong> {booking.dropLocation}</p>
                        <p><strong>Booking Date:</strong> {booking.date}</p>
                        <p><strong>Status:</strong> <span style={styles.status}>{booking.status}</span></p>
                        <div style={styles.buttonGroup}>
                            <button style={styles.acceptButton} onClick={() => handleUpdateStatus(booking.id, "Accepted")}>Accept</button>
                            <button style={styles.declineButton} onClick={() => handleUpdateStatus(booking.id, "Declined")}>Decline</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
        background: '#f9f9f9',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    list: {
        listStyle: 'none',
        padding: 0,
    },
    bookingItem: {
        background: '#fff',
        padding: '15px',
        marginBottom: '10px',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'left',
    },
    status: {
        fontWeight: 'bold',
        color: '#e67e22',
    },
    buttonGroup: {
        marginTop: '10px',
    },
    acceptButton: {
        background: '#2ecc71',
        color: '#fff',
        padding: '8px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    declineButton: {
        background: '#e74c3c',
        color: '#fff',
        padding: '8px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default BookingManagement;
