import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Analytics = () => {
    const [analytics, setAnalytics] = useState({});

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const response = await axios.get('http://localhost:8082/api/admin/analytics');
            setAnalytics(response.data);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h3>Analytics and Reports</h3>
            <p>Total Users: {analytics.totalUsers}</p>
            <p>Total Bookings: {analytics.totalBookings}</p>
        </div>
    );
};

export default Analytics;