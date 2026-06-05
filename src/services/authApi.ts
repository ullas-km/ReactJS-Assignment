import axios from "axios";

import { API_URL } from "../config";

const API_BASE = API_URL;
const AUTH_API = `${API_BASE}/auth`;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  user_id: number;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post(`${AUTH_API}/login`, data);

  return response.data;
};
