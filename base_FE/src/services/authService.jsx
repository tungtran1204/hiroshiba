// import axios from "axios";

// const API_BASE_URL = "http://localhost:8080/api/auth"; // URL của Spring Boot Backend

// export const registerUser = async (userData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/register`, userData);
//     return response.data;
//   } catch (error) {
//     console.error("Registration failed", error);
//     throw error.response?.data || "Registration failed";
//   }
// };

// export const loginUser = async (credentials) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/login`, credentials);
//     return response.data; // JWT token
//   } catch (error) {
//     console.error("Login failed", error);
//     throw error.response?.data || "Login failed";
//   }
// };
