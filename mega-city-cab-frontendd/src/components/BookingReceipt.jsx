import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BookingReceipt = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [kmCount, setKmCount] = useState(1);
    const ratePerKm = 150;

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/api/bookings/${id}`);
                setBooking(response.data);
            } catch (error) {
                console.error("Error fetching booking:", error);
            }
        };
        fetchBooking();
    }, [id]);

    const handlePayment = () => {
        const billAmount = kmCount * ratePerKm;
        navigate(`/payment/${id}`, { state: { amount: billAmount } });
    };

    if (!booking) return <p style={styles.loading}>Loading...</p>;

    return (
        <div style={styles.container}>
            <div style={styles.receiptBox}>
                <h2 style={styles.title}>Booking Receipt</h2>
                <p style={styles.detail}><strong>Customer Name:</strong> {booking.customerName}</p>
                <p style={styles.detail}><strong>Pickup Location:</strong> {booking.pickupLocation}</p>
                <p style={styles.detail}><strong>Drop Location:</strong> {booking.dropLocation}</p>
                <p style={styles.detail}><strong>Booking Date:</strong> {booking.date}</p>
                <p style={styles.status}><strong>Status:</strong> {booking.status}</p>

                {/* Bill Calculation */}
                <p style={styles.detail}><strong>Rate per KM:</strong> Rs. {ratePerKm}</p>
                <label style={styles.detail}><strong>Enter Distance (KM):</strong> </label>
                <input
                    type="number"
                    value={kmCount}
                    onChange={(e) => setKmCount(e.target.value)}
                    min="1"
                    style={styles.input}
                />
                <p style={styles.bill}><strong>Total Bill:</strong> Rs. {kmCount * ratePerKm}</p>

                <p style={styles.note}>Your booking is pending. Admin will contact you soon.</p>

                {/* Buttons */}
                <button style={styles.button} onClick={handlePayment}>Add Payment</button>
                <button style={styles.closeButton} onClick={() => navigate("/user-dashboard")}>Close</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
    },
    receiptBox: {
        background: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
        width: '400px',
        textAlign: 'center',
    },
    title: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    detail: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '10px',
    },
    status: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#e67e22',
        marginBottom: '15px',
    },
    note: {
        fontSize: '14px',
        color: '#888',
        fontStyle: 'italic',
    },
    bill: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#2c3e50',
        margin: '10px 0',
    },
    input: {
        width: '60px',
        padding: '5px',
        marginLeft: '5px',
        textAlign: 'center',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        backgroundColor: '#28a745',
        color: '#fff',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '10px',
    },
    closeButton: {
        backgroundColor: '#dc3545',
        color: '#fff',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    loading: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#555',
        marginTop: '20px',
    },
};

export default BookingReceipt;
