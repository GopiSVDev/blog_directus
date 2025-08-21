import axios from "axios";

const API_URL = process.env.DIRECTUS_URL;

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const register = async (data: RegisterData) => {
  try {
    const res = await axios.post(`${API_URL}/users/register`, data);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return (
        error.response?.data?.errors?.[0]?.message || "Registration failed"
      );
    } else {
      return "Something went wrong. Please try again.";
    }
  }
};

export const login = async (data: LoginData) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.errors?.[0]?.message || "Login failed";
    } else {
      return "Something went wrong. Please try again.";
    }
  }
};
