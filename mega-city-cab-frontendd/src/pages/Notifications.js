import React, { useState } from 'react';
import axios from 'axios';

const Notifications = () => {
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');

    const handleSendNotification = async () => {
        try {
            await axios.post('http://localhost:8082/api/admin/notifications', {
                recipient,
                message,
            });
            alert('Notification sent successfully');
            setRecipient('');
            setMessage('');
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h3>Send Notifications</h3>

            {/* Form to send notifications */}
            <div>
                <input
                    type="text"
                    placeholder="Recipient Username"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <textarea
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px', width: '300px', height: '100px' }}
                />
                <button
                    onClick={handleSendNotification}
                    style={{
                        padding: '5px 10px',
                        backgroundColor: '#3498db',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Notifications;