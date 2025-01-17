import axios from "axios";

const API_URL = "http://localhost:8080/api/unistock/au_01";

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (err) {
    console.error("Error during login:", err.response || err.message);
    throw err;
  }
};

const register = async (username, email, password, confirmPassword) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (err) {
    console.log("Error in register:", err);
    if (err.response) {
      throw new Error(err.response.data.message || "Registration failed.");
    } else if (err.request) {
      throw new Error("No response from the server.");
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};
export default { register, login };
