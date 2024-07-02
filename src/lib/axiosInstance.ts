import axios from 'axios';

// Create an axios instance with SSL configuration
const axiosInstance = axios.create({
    baseURL: 'https://localhost:7217/api',
    httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: false
    })
});

export default axiosInstance;