import React from 'react';
import { useParams } from 'react-router-dom';

const VehicleList = () => {
    const { category } = useParams(); // Extract category from URL

    // Hardcoded vehicle data
    const vehicles = {
        cars: [
            { id: 'CR 1', description: 'Honda FIT GP5 L GRADE 2015 Car- Ash Colur', image: '/images/honda-fit-gp5-black.jpg' },
            { id: 'CR 2', description: 'Honda FIT GP5 L GRADE 2015 Car- Black Colur.', image: '/images/honda-fit-gp5-silver.jpg' },
            { id: 'CR 3', description: 'BMW Mini Cooper 2016 Car.', image: '/images/bmw-mini-cooper.jpg' },
            { id: 'CR 4', description: 'Honda Civic 2001 Car.', image: '/images/honda-civic.jpg' },
            { id: 'CR 5', description: 'Micro PANDA 2012 Car.', image: '/images/micro-panda.jpg' },
            { id: 'CR 6', description: 'Mercedes Benz E350 AMG PREMIUM PLUS 2017.', image: '/images/fitted.jpg' },
            { id: 'CR 7', description: 'Toyota Premio NZT260 EX GSUPERIOR 2015.', image: '/images/fitted-2.jpg' },
            { id: 'CR 8', description: 'Mitsubishi Eclipse Cross 2018.', image: '/images/fitted-3.jpg' },
            { id: 'CR 9', description: 'Land Rover Range Evoque Rang 2013.', image: '/images/fitted-5.jpg' },
            { id: 'CR 10', description: 'Toyota Vitz 2007 Car Brand New.', image: '/images/toyota-vitz.jpg' },
            { id: 'CR 11', description: 'Nissan Sunny 1991 Car.', image: '/images/nissan-sunny.jpg' },
            { id: 'CR 12', description: 'Mazda 6 2014 Car .', image: '/images/mazda-mazda.jpg' },
            { id: 'CR 13', description: 'Nissan Sunny B211 GL 1976 Car', image: '/images/nissan-nissan-sunny.jpg' },


        ],
        van: [
            { id: 'VN 1', description: 'Toyota Grand Hiace 2007 Van.', image: '/images/toyota-grand-hiace.jpg' },
            { id: 'VN 2', description: 'Toyota Dolphin 113 1997 Van.', image: '/images/toyota-dolphin.jpg' },
            { id: 'VN 3', description: 'Honda Original Japan Mini Van 2004 Van', image: '/images/honda-mini-van.jpg' },
            { id: 'VN 4', description: 'Toyota Noah 1997 Van.', image: '/images/toyota-noha-cr.jpg' },
            { id: 'VN 5', description: 'Renault Renault 2007 Van.', image: '/images/renault-renault.jpg' },
            { id: 'VN 6', description: 'Mitsubishi Delica 1984 Van.', image: '/images/mitsubishi-delica.jpg' },
            { id: 'VN 7', description: 'Toyota Kdh 2015 Van.', image: '/images/toyota-kdh-2015.jpg' },

        ],
        'wedding-cars': [
            { id: 'WC 1', description: 'Classic white wedding car.', image: '/images/fitted-6.jpg' },
            { id: 'WC 2', description: 'Wedding Car Hire - BENZ C220 AMG 2018.', image: '/images/fitted-7.jpg' },
            { id: 'WC 3', description: 'Classic white wedding car.', image: '/images/fitted-8.jpg' },
            { id: 'WC 4', description: 'Axio hybrid wedding car.', image: '/images/fitted-9.jpg' },
            { id: 'WC 5', description: 'BENZ C220 AMGr.', image: '/images/fitted-10.jpg' },
            { id: 'WC 6', description: 'Bmw 520d Black.', image: '/images/fitted-11.jpg' },
        ],
        jeep: [
            { id: 'JP 1', description: 'Grand Cherokee 2016.', image: '/images/fitted-12.jpg' },
            { id: 'JP 2', description: 'Wrangler 2013.', image: '/images/fitted-13.jpg' },
            { id: 'JP 3', description: 'Wrangler Rubicon 2018.', image: '/images/fitted-14.jpg' },
            { id: 'JP 4', description: 'Vezel G Grade 2015.', image: '/images/fitted-15.jpg' },
            ],
    };

    const categoryVehicles = vehicles[category] || [];

    return (
        <div style={styles.container}>
            <h1>Vehicles in {category.charAt(0).toUpperCase() + category.slice(1)}</h1>

            <p style={{
                background: 'linear-gradient(135deg, #f3e6d8, #e4d1b9)',
                padding: '25px',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                maxWidth: '80%',
                margin: '20px auto'
            }}>
                <h1 style={{
                    color: '#8B6F47',
                    fontSize: '26px',
                    fontWeight: 'bold',
                    lineHeight: '1.6',
                    margin: 0,
                    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)'
                }}>
                    Select a vehicle of your choice and enter the code number of your chosen vehicle when filling out
                    the Add Booking Form.
                </h1>
            </p>


            <div style={styles.gallery}>
                {categoryVehicles.length > 0 ? (
                    categoryVehicles.map((vehicle) => (
                        <div key={vehicle.id} style={styles.vehicleCard}>
                            <img src={vehicle.image} alt={vehicle.id} style={styles.vehicleImage}/>
                            <h3>{vehicle.id}</h3>
                            <p>{vehicle.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No vehicles available in this category.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
    },
    message: {
        fontSize: '1rem',
        color: '#666',
        marginBottom: '20px',
    },
    gallery: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // Increased size
        gap: '30px',
        padding: '20px',
    },
    vehicleCard: {
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '15px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    },
    vehicleImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '8px',
    },
};

export default VehicleList;
