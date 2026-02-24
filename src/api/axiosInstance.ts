import axios from "axios"
import {baseUrl} from "../api.ts";

const api = axios.create({
    baseURL: baseUrl,
});

api.interceptors.request.use((config) => {
    const rawToken = localStorage.getItem("accessToken");
    const token = rawToken ? JSON.parse(rawToken) : null;
    if(token){
        config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    return config;
})

export default api;