import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVehicleById } from '../api/vehicleApi';

const VehicleDetails = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const data = await getVehicleById(id);
                setVehicle(data);
            } catch (error) {
                console.error('Error fetching vehicle details:', error);
            }
        };
        fetchVehicle();
    }, [id]);

    if (!vehicle) {
        return <p>Loading...</p>;
    }

    return (
        <div style={styles.container}>
            <h2>{vehicle.name}</h2>
            <img src={vehicle.image} alt={vehicle.name} style={styles.vehicleImage} />
            <p><strong>Model:</strong> {vehicle.model}</p>
            <p><strong>Driver Name:</strong> {vehicle.driverName}</p>
            <p><strong>License Number:</strong> {vehicle.driverLicenseNumber}</p>
            <p><strong>Driver Address:</strong> {vehicle.driverAddress}</p>
            <p><strong>Details:</strong> {vehicle.details}</p>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
    },
    vehicleImage: {
        width: '100%',
        height: '300px',
        objectFit: 'cover',
        borderRadius: '8px',
    },
};

export default VehicleDetails;