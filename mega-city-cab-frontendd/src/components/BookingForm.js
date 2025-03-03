import { useState } from "react";

function BookingForm() {
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [message, setMessage] = useState("");

    const handleBooking = async () => {
        const bookingData = {
            userId: "12345", // Replace with logged-in user's ID
            pickupLocation: pickup,
            destination: destination,
        };

        try {
            const response = await fetch("http://localhost:8082/api/bookings/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });

            const result = await response.text();
            setMessage(result);
        } catch (error) {
            setMessage("Failed to add booking. Please try again.");
        }
    };

    return (
        <div>
            <h2>Book a Ride</h2>
            <input type="text" placeholder="Pickup Location" value={pickup} onChange={(e) => setPickup(e.target.value)} />
            <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
            <button onClick={handleBooking}>Book Now</button>
            <p>{message}</p>
        </div>
    );
}

export default BookingForm;
