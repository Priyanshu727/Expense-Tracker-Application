import axios from 'axios';

const API_URL = 'http://localhost:8084/api'; // Change to your backend URL

// Function to register a new user
export const registerUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/register`, { email, password });
    return response.data;
};

// Function to log in a user
export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data; // This will contain the JWT token
};

// Function to get expenses
export const fetchExpenses = async (token) => {
    const response = await axios.get(`${API_URL}/expenses`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data; // This will be an array of expenses
};

// Function to add an expense
export const addExpense = async (token, expenseData) => {
    const response = await axios.post(API_URL, expenseData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Function to delete an expense
export const deleteExpense = async (token, id) => {
    const response = await axios.delete(`${API_URL}/expenses/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
