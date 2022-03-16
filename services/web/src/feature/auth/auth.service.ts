import axios from 'axios'
import { RegisterFormData } from './types';

const API_URL = "http://localhost:4000"


const register = ({ name, email, password }: RegisterFormData) => {
    return axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
    });
};

const login = ({email, password}: any) => {
    return axios
        .post(API_URL + "login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

export const authService = {
    register,
    login,
    logout
}