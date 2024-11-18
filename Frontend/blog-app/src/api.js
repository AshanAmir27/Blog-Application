import axios from "axios";

const API_URL = "http://localhost:3000";

export const getTodo = async () => {
  try {
    const response = await axios.get(`${API_URL}/a`);
    return response.data;
  } catch (error) {
    console.error("Error fetching todo:", error);
    return null;
  }
};
