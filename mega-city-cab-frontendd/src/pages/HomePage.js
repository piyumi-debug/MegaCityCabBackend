import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import vehiclesData from '../data/vehicles';
import { fetchVehiclesByCategory } from '../services/api'; // Corrected import path

const HomePage = () => {
    // State for vehicles and category
    const [vehicles, setVehicles] = useState([]);
    const [category, setCategory] = useState('cars'); // Default category
    // Filter vehicles by selected category
    const filteredVehicles = vehiclesData.filter(vehicle => vehicle.category === category);

    // Reviews Data
    const reviews = [
        { id: 1, name: "Sachindu Mathangaweera", text: "Excellent service! Highly recommended." },
        { id: 2, name: "Piyumi Wedage", text: "The drivers are very friendly and always on time!" },
        { id: 3, name: "Chenu", text: "Affordable rates and comfortable rides!" }
    ];

    // Vehicle Categories
    const categories = [
        { id: 'cars', name: 'Cars', image: '/images/car1.webp' },
        { id: 'van', name: 'Van', image: '/images/van1.webp' },
        { id: 'wedding-cars', name: 'Wedding Cars', image: '/images/weddingcar.webp' },
        { id: 'jeep', name: 'Jeep', image: '/images/jeep.jpeg' },
    ];


    // Fetch vehicles based on category when category changes
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const normalizedCategory = category.toLowerCase(); // Normalize category
                const data = await fetchVehiclesByCategory(normalizedCategory);
                setVehicles(data);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };
        fetchVehicles();
    }, [category]);

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <h1>🚗 Mega City Cab 🚖</h1>
            <p style={styles.subtitle}>Your trusted partner for affordable and reliable transportation</p>

            {/* Contact Details */}
            <div style={styles.contact}>
                <p><strong>📍 Location:</strong> Matara Rd, Akuressa</p>
                <p><strong>📞 Phone:</strong> +94 711310123</p>
                <p><strong>📧 Email:</strong> pradeewedage2003@gmail.com</p>
            </div>

            {/* Vehicle Categories */}
            <h3 style={styles.sectionTitle}>🚗 Available Vehicle Categories</h3>
            <div style={styles.gallery}>
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        to={`/vehicles/${category.id}`}
                        style={styles.categoryCard}
                        onClick={() => setCategory(category.id)} // Update category when clicked
                    >
                        <img src={category.image} alt={category.name} style={styles.categoryImage} />
                        <p>{category.name}</p>
                    </Link>
                ))}
            </div>



            {/* Customer Reviews */}
            <h3 style={styles.sectionTitle}>⭐ Customer Reviews</h3>
            <Slider {...settings} style={styles.reviewContainer}>
                {reviews.map((review) => (
                    <div key={review.id} style={styles.reviewBox}>
                        <p style={styles.reviewText}>"{review.text}"</p>
                        <p style={styles.reviewAuthor}>- {review.name}</p>
                    </div>
                ))}
            </Slider>

            {/* Action Buttons */}
            <div style={styles.buttonContainer}>
                <Link to="/book-now"><button style={styles.button}>🚖 Book Now</button></Link>
                <Link to="/create-account"><button style={styles.button}>🆕 Create Account</button></Link>
                <Link to="/login"><button style={styles.button}>🔑 Login</button></Link>

            </div>
        </div>
    );
};

// CSS Styling
const styles = {
    container: {
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: '#f4f4f4',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '900px',
        margin: 'auto'
    },
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#333'
    },
    subtitle: {
        fontSize: '1.2rem',
        color: '#666'
    },
    contact: {
        margin: '1rem 0',
        backgroundColor: '#ffffff',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    sectionTitle: {
        fontSize: '1.5rem',
        margin: '1rem 0',
        color: '#333'
    },
    gallery: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        padding: '20px'
    },
    categoryCard: {
        textDecoration: 'none',
        color: 'black',
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    },
    categoryImage: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '8px'
    },
    vehiclesContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '2rem'
    },
    vehicleCard: {
        width: '200px',
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    vehicleImage: {
        width: '100%',
        height: '120px',
        objectFit: 'cover',
        borderRadius: '8px'
    },
    reviewContainer: {
        width: '100%',
        maxWidth: '600px',
        margin: 'auto'
    },
    reviewBox: {
        backgroundColor: '#ffffff',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
    },
    reviewText: {
        fontSize: '1rem',
        fontStyle: 'italic'
    },
    reviewAuthor: {
        fontWeight: 'bold',
        marginTop: '0.5rem'
    },
    buttonContainer: {
        marginTop: '1.5rem'
    },
    button: {
        padding: '0.5rem 1rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '0.5rem',
        fontSize: '1rem'
    }
};

export default HomePage;
