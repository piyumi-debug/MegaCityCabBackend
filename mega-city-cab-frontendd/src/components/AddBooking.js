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
            const response = await axios.post("http://localhost:8080/api/bookings", booking);
            navigate(`/receipt/${response.data.id}`);
        } catch (error) {
            console.error("Error creating booking:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
            <input type="text" placeholder="Pickup Location" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} required />
            <input type="text" placeholder="Drop Location" value={dropLocation} onChange={(e) => setDropLocation(e.target.value)} required />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <button type="submit">Add Booking</button>
        </form>
    );
};

export default AddBooking;