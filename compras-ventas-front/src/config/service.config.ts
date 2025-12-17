import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8089'

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(
    async (config: any) => {
        let token = Cookies.get('token');
        if(token){
            //TODO implement refresh token
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    } 
);

apiClient.interceptors.response.use();