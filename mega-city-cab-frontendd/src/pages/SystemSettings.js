import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SystemSettings = () => {
    const [settings, setSettings] = useState({});
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await axios.get('http://localhost:8082/api/admin/settings');
            setSettings(response.data);
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

    const handleUpdateSetting = async () => {
        try {
            await axios.post('http://localhost:8082/api/admin/settings', { [key]: value });
            fetchSettings(); // Refresh settings
            setKey('');
            setValue('');
        } catch (error) {
            console.error('Error updating setting:', error);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h3>System Settings</h3>

            {/* Display current settings */}
            <div style={{ marginBottom: '20px' }}>
                <h4>Current Settings</h4>
                <ul>
                    {Object.entries(settings).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Form to update settings */}
            <div>
                <h4>Update Setting</h4>
                <input
                    type="text"
                    placeholder="Key (e.g., basePrice)"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="text"
                    placeholder="Value (e.g., 100)"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <button
                    onClick={handleUpdateSetting}
                    style={{
                        padding: '5px 10px',
                        backgroundColor: '#2ecc71',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default SystemSettings;