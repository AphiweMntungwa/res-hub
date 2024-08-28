import axios from 'axios';

// Create an axios instance with SSL configuration
const axiosInstance = axios.create({
    baseURL: 'https://localhost:7217/api',
    httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: false
    }),
    withCredentials: true
});

export const axiosExpressInstance = axios.create({
    baseURL: "http://localhost:3001/api",
    httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: false
    }),
    withCredentials: true
})


export default axiosInstance;