import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8082/api',
    headers: {
        Authorization: 'Basic ' + btoa('admin:admin'),
    },
});

export const fetchVehicles = async () => {
    const response = await apiClient.get('/vehicles');
    return response.data;
};

export const fetchVehiclesByCategory = async (category) => {
    const normalizedCategory = category.toLowerCase(); // Normalize category
    const response = await apiClient.get(`/vehicles?category=${normalizedCategory}`);
    return response.data;
};

export const addVehicle = async (vehicleData) => {
    const response = await apiClient.post('/vehicles', vehicleData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const deleteVehicle = async (id) => {
    const response = await apiClient.delete(`/vehicles/${id}`);
    return response.data;
};