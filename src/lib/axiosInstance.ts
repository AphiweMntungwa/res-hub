import axios from 'axios';

// Create an axios instance with SSL configuration
let httpsAgent;

if (typeof window === 'undefined') {
    httpsAgent = new (require('https').Agent)({
        rejectUnauthorized: false
    });
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    httpsAgent,
    withCredentials: true
});

export const axiosExpressInstance = axios.create({
    baseURL: "http://localhost:3001/api",
    httpsAgent,
    withCredentials: true
})


export default axiosInstance;