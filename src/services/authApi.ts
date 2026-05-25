import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;
const AUTH_API = `${API_BASE}/auth`;

export interface LoginPayload {
    email: string;
    password: string;
}

// export interface LoginResponse {
//     token: string;
// }
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

export const loginUser = async(
    data: LoginPayload
): Promise<LoginResponse> => {
    const response = await axios.post(
        `${AUTH_API}/login`,
        data
    );

    return response.data;
}