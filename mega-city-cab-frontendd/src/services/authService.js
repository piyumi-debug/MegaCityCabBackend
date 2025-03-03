// src/services/authService.js
import axios from 'axios';

const loginUser = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8082/api/users/login', {
            username,
            password
        });
        console.log('Login successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response.data);
        throw new Error(error.response.data.message); // Throw an error to be caught in the component
    }
};

export default loginUser;
