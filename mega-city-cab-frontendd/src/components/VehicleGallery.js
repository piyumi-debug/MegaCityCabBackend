import React from 'react';
import { Link } from 'react-router-dom';

const VehicleGallery = ({ vehicles }) => {
    return (
        <div style={styles.gallery}>
            {vehicles.map((vehicle) => (
                <Link key={vehicle.id} to={`/vehicle/${vehicle.id}`} style={styles.vehicleCard}>
                    <img src={vehicle.image} alt={vehicle.name} style={styles.vehicleImage} />
                    <p>{vehicle.name}</p>
                </Link>
            ))}
        </div>
    );
};

const styles = {
    gallery: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        padding: '20px',
    },
    vehicleCard: {
        textDecoration: 'none',
        color: 'black',
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    vehicleImage: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '8px',
    },
};

export default VehicleGallery;