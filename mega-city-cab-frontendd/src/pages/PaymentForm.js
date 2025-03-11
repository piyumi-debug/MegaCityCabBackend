import React, { useState } from "react";

const BankTransferUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        fetch("http://localhost:8082/api/upload-slip", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => alert("Upload successful!"))
            .catch(error => console.error("Error uploading file:", error));
    };

    return (
        <div style={styles.container}>
            <div style={styles.formBox}>
                <h2 style={styles.title}>Upload Payment Slip</h2>
                <p style={styles.description}>Please upload your bank transfer receipt to confirm the payment.</p>

                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    style={styles.fileInput}
                />

                <button onClick={handleUpload} style={styles.uploadButton}>Upload Payment Slip</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #f1f1f1, #e0e0e0)', // Lighter gradient for a soft feel
    },
    formBox: {
        background: '#fff',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',  // Lighter shadow for softer depth
        width: '450px',
        textAlign: 'center',
        transition: 'transform 0.3s ease',
    },
    title: {
        fontSize: '28px',
        color: '#333',
        marginBottom: '15px',
        fontWeight: 'bold',
        letterSpacing: '1px',
    },
    description: {
        fontSize: '16px',
        color: '#666',
        marginBottom: '25px',
        fontStyle: 'italic',
    },
    fileInput: {
        width: '100%',
        padding: '12px',
        marginBottom: '30px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        fontSize: '16px',
        backgroundColor: '#f9f9f9',  // Lighter background for the input
        transition: 'border-color 0.3s ease',
    },
    uploadButton: {
        backgroundColor: '#4CAF50',  // Lighter green for a fresh feel
        color: '#fff',
        padding: '15px 30px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '18px',
        width: '100%',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
    },
    uploadButtonHover: {
        backgroundColor: '#45a049',  // Slightly darker green on hover
        transform: 'scale(1.05)',
    }
};

export default BankTransferUpload;
