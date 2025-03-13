import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [message, setMessage] = useState('');
    const [editVehicle, setEditVehicle] = useState(null);
    const [vehicleData, setVehicleData] = useState({
        name: '',
        category: '',
        description: '',
        image: '',
    });

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get("http://localhost:8082/api/vehicles");
                setVehicles(response.data);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };
        fetchVehicles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData({
            ...vehicleData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editVehicle) {
            try {
                // Update vehicle
                const response = await axios.put(`http://localhost:8082/api/vehicles/${editVehicle.id}`, vehicleData);
                console.log('Update response:', response); // Check the response here
                setMessage('Vehicle updated successfully!');
                setEditVehicle(null);
                setVehicleData({
                    name: '',
                    category: '',
                    description: '',
                    image: '',
                });
                // Fetch the updated list of vehicles
                const updatedVehicles = await axios.get("http://localhost:8082/api/vehicles");
                setVehicles(updatedVehicles.data);
            } catch (error) {
                console.error("Error updating vehicle:", error.response || error.message);
                setMessage('Failed to update vehicle. Please try again.');
            }
        } else {
            try {
                // Add new vehicle
                const response = await axios.post("http://localhost:8082/api/vehicles", vehicleData);
                console.log('Add response:', response); // Check the response here
                setMessage('Vehicle added successfully!');
                const updatedVehicles = await axios.get("http://localhost:8082/api/vehicles");
                setVehicles(updatedVehicles.data);
                setVehicleData({
                    name: '',
                    category: '',
                    description: '',
                    image: '',
                });
            } catch (error) {
                console.error("Error adding vehicle:", error.response || error.message);
                setMessage('Failed to add vehicle. Please try again.');
            }
        }
    };

    // Handle edit action (populate form with existing vehicle data)
    const handleEdit = (vehicle) => {
        console.log('Editing vehicle:', vehicle);
        setEditVehicle(vehicle);
        setVehicleData({
            name: vehicle.name,
            category: vehicle.category,
            description: vehicle.description,
            image: vehicle.image,
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8082/api/vehicles/${id}`);
            const response = await axios.get("http://localhost:8082/api/vehicles");
            setVehicles(response.data);
            setMessage("Vehicle deleted successfully!"); // Set the success message
        } catch (error) {
            console.error("Error deleting vehicle:", error);
            setMessage("Error deleting vehicle. Please try again."); // Set the error message
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Manage Vehicles and Drivers</h2>

            {/* Display the message */}
            {message && (
                <div style={styles.message}>
                    {message}
                </div>
            )}

            <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={vehicleData.name}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Category</label>
                    <input
                        type="text"
                        name="category"
                        value={vehicleData.category}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={vehicleData.description}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Image</label>
                    <input
                        type="text"
                        name="image"
                        value={vehicleData.image}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <button type="submit" style={styles.button}>{editVehicle ? 'Update Vehicle' : 'Add Vehicle'}</button>
            </form>

            <ul style={styles.vehicleList}>
                {vehicles.length > 0 ? (
                    vehicles.map((vehicle) => (
                        <li key={vehicle.id} style={styles.vehicleItem}>
                            <p><strong>Name:</strong> {vehicle.name}</p>
                            <p><strong>Category:</strong> {vehicle.category}</p>
                            <p><strong>Description:</strong> {vehicle.description}</p>
                            <p><strong>Image:</strong> {vehicle.image}</p>
                            <div style={styles.actions}>
                                <button onClick={() => handleEdit(vehicle)} style={styles.editButton}>Edit</button>
                                <button onClick={() => handleDelete(vehicle.id)} style={styles.deleteButton}>Delete</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No vehicles available.</p>
                )}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f4f4f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '400px',
        margin: '0 auto',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: '16px',
        color: '#444',
        marginBottom: '5px',
    },
    input: {
        padding: '10px',
        fontSize: '14px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        marginBottom: '10px',
    },
    button: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    },
    vehicleList: {
        listStyleType: 'none',
        padding: '0',
    },
    vehicleItem: {
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '10px',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    editButton: {
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    deleteButton: {
        backgroundColor: '#FF5733',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    message: {
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        borderRadius: '5px',
        marginBottom: '20px',
        textAlign: 'center',
    },
};

export default ManageVehicles;
