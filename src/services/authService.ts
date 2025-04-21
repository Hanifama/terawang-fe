
import { jwtDecode } from "jwt-decode";
import { api } from "../utils/api";
import { ActivateRequest, ActivateResponse, ApiDetailUserResponse, Company, CompanyResponse, ForgotPasswordRequest, ForgotPasswordResponse, IApiResponse, IUserAddRequest, LoginData, LoginRequest, ProfileResponse, RegisterRequest, RegisterResponse, UpdatePasswordRequest, UpdatePasswordResponse, UpdateProfileRequest, UpdateProfileResponse, UploadResponse, User, UserProfile, UserResponse } from "../interfaces/auth";
import { ApiResponse } from "../interfaces/api";

export const tokenService = {
    setUserToken: (token: string | null) => {
        if (token) localStorage.setItem("userToken", token);
        else localStorage.removeItem("userToken");
    },

    getUserToken: (): string | null => localStorage.getItem("userToken"),

    setAppToken: (token: string | null) => {
        if (token) localStorage.setItem("appToken", token);
        else localStorage.removeItem("appToken");
    },

    getAppToken: (): string | null => localStorage.getItem("appToken"),

    setRefreshToken: (token: string | null) => {
        if (token) localStorage.setItem("refreshToken", token);
        else localStorage.removeItem("refreshToken");
    },

    getRefreshToken: (): string | null => localStorage.getItem("refreshToken"),

    clearTokens: () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("appToken");
        localStorage.removeItem("refreshToken");
    },

    decodeToken: (): any | null => {
        const token = localStorage.getItem("userToken");
        if (!token) return null;

        try {
            const decoded = jwtDecode(token);
            // console.log("Decoded Token:", decoded);
            return decoded;
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    },

    getUserRole: (): string | null => {
        const decodedToken = tokenService.decodeToken();
        return decodedToken?.role || null;
    },
};

export const clearTokens = () => {
    localStorage.removeItem("appToken");
    localStorage.removeItem("userToken");
    localStorage.removeItem("refreshToken");
};

export const login = async (credentials: LoginRequest): Promise<LoginData> => {
    // console.log("Login request ke API:", credentials); 

    const response = await api.post<ApiResponse<LoginData>>("/users/login", credentials);

    // console.log("Response API:", response.data); 

    if (response.data.success) {
        const { appToken, userToken, refreshToken } = response.data.data;

        tokenService.setUserToken(userToken);
        tokenService.setAppToken(appToken);
        tokenService.setRefreshToken(refreshToken);

        return response.data.data;
    }

    throw new Error(response.data.message || "Login gagal");
};


export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>("/users/register", {
        ...data
    });

    return response.data;
};

export const activateUser = async (data: ActivateRequest): Promise<ActivateResponse> => {
    try {
        const response = await api.post<ActivateResponse>("/users/activate", data);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Terjadi kesalahan saat mengaktifkan akun.",
            statusCode: error.response?.status || 500,
        };
    }
};

export const forgotPassword = async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    try {
        const response = await api.post<ForgotPasswordResponse>("/users/forgot-password", data);
        return response.data;
    } catch (error: any) {
        console.error("Forgot password request failed:", error);
        throw new Error(error.response?.data?.message || "Terjadi kesalahan, coba lagi nanti.");
    }
};

export const getProfile = async (): Promise<UserProfile> => {
    try {
        const response = await api.get<ProfileResponse>("/users/profile");
        return response.data.data.user;
    } catch (error) {
        console.error("Failed to fetch profile:", error);
        throw error;
    }
};

export const updateProfile = async (profileData: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
    try {
        const response = await api.post<UpdateProfileResponse>("/users/update-profile", profileData, {
            headers: {
                Authorization: `Bearer ${tokenService.getUserToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Update profile request failed:", error);
        throw error;
    }
};

export const uploadProfileImage = async (file: File): Promise<UploadResponse> => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.post<UploadResponse>("/images/profile", formData);
        return response.data;
    } catch (error) {
        console.error("Upload image failed:", error);
        throw error;
    }
};

export const updatePassword = async (
    data: UpdatePasswordRequest
): Promise<UpdatePasswordResponse> => {
    try {
        const response = await api.post<UpdatePasswordResponse>("/users/update-password", data);
        return response.data;
    } catch (error) {
        console.error("Update password request failed:", error);
        throw error;
    }
};


export const getCompanies = async (
    page: number = 1,
    limit: number = 50
): Promise<Company[]> => {
    try {
        const response = await api.get<CompanyResponse>("/companies", {
            params: { page, limit },
        });
        return response.data.data.companies;
    } catch (error) {
        console.error("Failed to fetch companies:", error);
        throw error;
    }
};

export const getUsers = async (page: number = 1, limit: number = 10): Promise<UserResponse["data"]> => {
    try {
        const response = await api.get<UserResponse>("/users/module", {
            headers: {
                Authorization: `Bearer ${tokenService.getUserToken()}`,
            },
            params: { page, limit },
        });

        if (response.data.success) {
            return response.data.data;
        }

        throw new Error("Gagal mengambil data user.");
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const addUser = async (userData: IUserAddRequest): Promise<IApiResponse> => {
    const userToken = tokenService.getUserToken();

    if (!userToken) {
        throw new Error("User token is required");
    }

    try {
        const response = await api.post<IApiResponse>("/users/add", userData, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Failed to add user:", error);

        throw new Error(error.response?.data?.message || "Failed to add user");
    }
};

export const getUserDetails = async (guid: string): Promise<User> => {
    try {
        const token = tokenService.getUserToken();
        if (!token) {
            throw new Error("User token is required.");
        }

        const response = await api.get<ApiDetailUserResponse>(`/users/detail/${guid}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const allowedGuidApplications = (import.meta.env.VITE_GUID_APPLICATION || "").split(",");
        const userData = response.data.data.user;

        // Filter applications berdasarkan guidApplication yang ada di env
        userData.applications = userData.applications.filter(app =>
            allowedGuidApplications.includes(app.guidApplication)
        );

        return userData;
    } catch (error) {
        console.error("Failed to fetch user details:", error);
        throw error;
    }
};

export const deleteUser = async (guid: string) => {
    try {
        const response = await api.delete(`/users/delete/${guid}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to delete user");
    }
};







