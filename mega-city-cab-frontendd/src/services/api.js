import axios from 'axios';

// Load API URL and credentials from environment variables
const API_URL = process.env.REACT_APP_API_URL;
const USERNAME = process.env.REACT_APP_USERNAME;
const PASSWORD = process.env.REACT_APP_PASSWORD;

// Encode credentials in base64
const encodedCredentials = btoa(`${USERNAME}:${PASSWORD}`);

// Create an Axios instance with authentication headers
const apiClient = axios.create({
    baseURL: 'http://localhost:8082/api',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('user:5178387e-4b17-4776-b0bf-ba4a70ff6802'),  // Use base64 encoded credentials from env
    },
});

// Fetch all bookings
export const fetchBookings = async () => {
    const response = await apiClient.get('/bookings');
    return response.data;
};

// Add a new booking
export const addBooking = async (bookingData) => {
    const response = await apiClient.post('/bookings', bookingData);
    return response.data;
};
