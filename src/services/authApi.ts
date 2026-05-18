import axios from 'axios';

const API_URL = "http://localhost:3000/auth"

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export const loginUser = async(
    data: LoginPayload
): Promise<LoginResponse> => {
    const response = await axios.post(
        `${API_URL}/login`,
        data
    );

    return response.data;
}