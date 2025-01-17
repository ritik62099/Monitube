// src/utils/api.js
import axios from 'axios';

const API_URL = 'http://10.0.2.2:5000/api';

export const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
};

export const fetchProductDetails = async (productId) => {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
};

// You can add more API functions here as needed.
