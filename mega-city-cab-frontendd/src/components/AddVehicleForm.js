import React, { useState } from 'react';
import { addVehicle } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddVehicleForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Car',
        description: '',
        image: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('image', formData.image);

        try {
            await addVehicle(formDataToSend);
            alert('Vehicle added successfully!');
            navigate(`/vehicles/${formData.category.toLowerCase().replace(/\s+/g, '-')}`);
        } catch (error) {
            console.error('Error adding vehicle:', error);
            alert('Failed to add vehicle. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2>Add a New Vehicle</h2>
            <label>
                Vehicle Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
            </label>
            <label>
                Category:
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={styles.input}
                >
                    <option value="Car">Car</option>
                    <option value="Van">Van</option>
                    <option value="Wedding Car">Wedding Car</option>
                    <option value="Jeep">Jeep</option>
                </select>
            </label>
            <label>
                Description:
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    placeholder="Driver Name,Licen Number,Vehicle color,Available Dates, seating capacity, features, any special requests..."
                />
            </label>
            <label>
                Upload Image:
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    style={styles.input}
                />
            </label>
            <button type="submit" style={styles.button}>
                Add Vehicle
            </button>
        </form>
    );
};

const styles = {
    form: {
        maxWidth: '600px',
        margin: 'auto',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: '#f4f4f4',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginBottom: '15px',
        width: '100%',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
    },
};

export default AddVehicleForm;