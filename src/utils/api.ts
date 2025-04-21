import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { tokenService } from "../services/authService";

// API untuk layanan utama (Menggunakan userToken)
const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: "application/json",
    },
});

// API untuk MITRA (Menggunakan appToken)
const mitraApi: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_MITRA_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

const mitraApiPublic: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_MITRA_URL,
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

mitraApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const appToken = tokenService.getAppToken();

    if (appToken) {
        config.headers.Authorization = `Bearer ${appToken}`;
    }

    return config;
});

export { api, mitraApi, mitraApiPublic };
