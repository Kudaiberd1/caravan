import axios from "axios";
import {baseUrl} from "../api.ts";

const API_URL = baseUrl+"/auth";

export const LoginApi = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, {
        username,
        password
    });
    return response.data;
}