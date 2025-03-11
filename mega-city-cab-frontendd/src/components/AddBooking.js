import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBooking = () => {
    const [customerName, setCustomerName] = useState("");
    const [pickupLocation, setPickupLocation] = useState("");
    const [dropLocation, setDropLocation] = useState("");
    const [date, setDate] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const booking = {
            customerName,
            pickupLocation,
            dropLocation,
            date,
        };

        try {
            const response = await axios.post("http://localhost:8082/api/bookings", booking);
            navigate(`/receipt/${response.data.id}`);
        } catch (error) {
            console.error("Error creating booking:", error);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Add Your Booking</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Customer Name and Vehicle ID"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Pickup Location"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Drop Location"
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Add Booking</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
        padding: '20px',
    },
    title: {
        fontSize: '28px',
        color: '#333',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
        width: '400px',
    },
    input: {
        marginBottom: '15px',
        padding: '12px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        outline: 'none',
    },
    button: {
        padding: '12px',
        fontSize: '18px',
        color: '#fff',
        backgroundColor: '#27ae60',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: '0.3s',
    },
    buttonHover: {
        backgroundColor: '#219150',
    }
};

export default AddBooking;
