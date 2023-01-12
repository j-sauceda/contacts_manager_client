import axios from "axios";

interface authData {
  email: string;
  password: string;
  password2?: string;
}

const login = async (userData: authData) => {
  const url = import.meta.env.VITE_API_URL + "auth/login";
  const response = await axios.post(url, userData);
  if (response.data) {
    return response.data;
  }
  return response.statusText;
};

const register = async (userData: authData) => {
  const url = import.meta.env.VITE_API_URL + "auth/register";
  const response = await axios.post(url, userData);
  if (response.data) {
    return response.data;
  }
  return response.statusText;
};

export const authService = {
  login,
  register,
};
