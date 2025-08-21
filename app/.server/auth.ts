import axios from "axios";

const API_URL = process.env.DIRECTUS_URL;

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const register = async (data: RegisterData) => {
  try {
    const res = await axios.post(`${API_URL}/users/register`, data);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Register error:", error.response?.data || error.message);
    } else {
      console.error("Register error:", error);
    }
    throw error;
  }
};
