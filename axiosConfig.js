// axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    // Tutaj możesz dodać globalne ustawienia dla Axios, np. baseURL
});

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
