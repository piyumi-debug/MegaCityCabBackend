import React, { useState } from 'react';
import axios from 'axios';

const UploadPaymentSlip = () => {
    const [file, setFile] = useState(null); // State to hold the selected file
    const [message, setMessage] = useState(""); // State to hold success/error message
    const [loading, setLoading] = useState(false); // State to track loading status

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle form submission (file upload)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true); // Set loading to true while the upload is in progress
        setMessage(""); // Reset the message

        try {
            const response = await axios.post("http://localhost:8082/api/payments/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage(response.data); // Show success message
            setFile(null); // Reset file input
        } catch (error) {
            setMessage("Error uploading the file. Please try again."); // Show error message
        } finally {
            setLoading(false); // Set loading to false after the request is complete
        }
    };

    return (
        <div>
            <h2>Upload Payment Slip</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="file"
                        name="paymentSlip"
                        onChange={handleFileChange}
                        accept="image/*,application/pdf" // Allow images and PDFs
                        required
                    />
                </div>
                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Uploading...' : 'Upload Payment Slip'}
                    </button>
                </div>
            </form>

            {message && <p>{message}</p>} {/* Display success or error message */}
        </div>
    );
};

export default UploadPaymentSlip;
