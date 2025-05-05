import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { tokenService } from "../services/authService";

// API untuk layanan Auth
const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_SSO_URL,
    headers: {
        Accept: "application/json",
    },
});

// API untuk Project Layanan Aplikasi
const projectApi: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_PROJECT_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const userToken = tokenService.getUserToken();

    if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
    }

    if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
    } else {
        config.headers["Content-Type"] = "application/json";
    }

    return config;
});

projectApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const appToken = tokenService.getAppToken();

    if (appToken) {
        config.headers.Authorization = `Bearer ${appToken}`;
    }

    return config;
});

export { api, projectApi };
