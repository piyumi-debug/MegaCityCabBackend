import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
    // Reviews Data
    const reviews = [
        { id: 1, name: "Sachindu Mathangaweera", text: "Excellent service! Highly recommended." },
        { id: 2, name: "Piyumi Wedage", text: "The drivers are very friendly and always on time!" },
        { id: 3, name: "Chenu", text: "Affordable rates and comfortable rides!" }
    ];

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
            <h1 style={styles.title}>🚖 Mega City Cab 🚖</h1>
            <p style={styles.subtitle}>Your trusted partner for affordable and reliable transportation</p>

            {/* Contact Details */}
            <div style={styles.contact}>
                <p><strong>📍 Location:</strong> Matara Rd, Akuressa</p>
                <p><strong>📞 Phone:</strong> +94 711310123</p>
                <p><strong>📧 Email:</strong> pradeewedage2003@gmail.com</p>
            </div>

            {/* Vehicle Photos */}
            <h3 style={styles.sectionTitle}>🚗 Our Vehicles</h3>
            <div style={styles.vehicleContainer}>
                <img src="/images/car1.webp" alt="Car 1" style={styles.vehicleImage} />
                <img src="/images/car2.png" alt="Car 2" style={styles.vehicleImage} />
                <img src="/images/van1.webp" alt="Car 3" style={styles.vehicleImage} />
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
        maxWidth: '800px',
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
    vehicleContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap'
    },
    vehicleImage: {
        width: '150px',
        height: '100px',
        borderRadius: '8px',
        border: '2px solid #ddd'
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
