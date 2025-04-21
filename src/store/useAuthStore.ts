import { create } from "zustand";
import { activateUser, addUser, deleteUser, forgotPassword, getCompanies, getProfile, getUserDetails, getUsers, login, register, updatePassword, updateProfile, uploadProfileImage } from "../services/authService";

import {
    LoginData,
    LoginRequest,
    UpdateProfileRequest,
    UserProfile,
    UploadResponse,
    UpdatePasswordRequest,
    RegisterRequest,
    Company,
    ActivateRequest,
    ForgotPasswordRequest,
    UserResponse,
    IUserAddRequest
} from "../interfaces/auth";

interface AuthState {
    users: UserResponse["data"];
    profile: UserProfile | null;
    user: LoginData | null;
    selectedUser: UserProfile | null;
    companies: Company[];
    isLoading: boolean;
    error: string | null;
    loginUser: (credentials: LoginRequest) => Promise<void>;
    registerUser: (data: RegisterRequest) => Promise<void>;
    fetchCompanies: () => Promise<void>;
    fetchUsers: (page?: number, limit?: number) => Promise<void>;
    fetchUserDetails: (guid: string) => Promise<void>;
    addUser: (data: IUserAddRequest) => Promise<void>;
    deleteUser: (guid: string) => Promise<void>;
    activateUser: (data: ActivateRequest) => Promise<void>;
    logoutUser: () => void;
    fetchProfile: () => Promise<void>;
    updateUserProfile: (profileData: UpdateProfileRequest) => Promise<void>;
    uploadUserProfileImage: (file: File) => Promise<UploadResponse>;
    changePassword: (data: UpdatePasswordRequest) => Promise<void>;
    forgotPassword: (data: ForgotPasswordRequest) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    users: {
        users: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
    },

    user: null,
    selectedUser: null,
    profile: null,
    companies: [],
    isLoading: false,
    error: null,

    loginUser: async (credentials) => {
        set({ isLoading: true, error: null });

        try {
            const userData = await login(credentials);
            set({ user: userData, isLoading: false });
            await get().fetchProfile();
        } catch (error: any) {
            set({ error: error.response?.data?.message || error.message, isLoading: false });
        }
    },

    fetchCompanies: async () => {
        set({ isLoading: true, error: null });

        try {
            const companiesData = await getCompanies();
            set({ companies: companiesData, isLoading: false });
        } catch (error: any) {
            console.error("Gagal mengambil data perusahaan:", error.message);
            set({ error: error.message, isLoading: false });
        }
    },

    registerUser: async (data) => {
        set({ isLoading: true, error: null });

        try {
            const response = await register(data);
            if (!response.success) {
                throw new Error(response.message);
            }
            set({ isLoading: false });
        } catch (error: any) {
            console.error("Gagal register:", error.message);
            set({ error: error.response?.data?.message || error.message, isLoading: false });
        }
    },

    activateUser: async (data) => {
        set({ isLoading: true, error: null });

        try {
            const response = await activateUser(data);
            if (!response.success) {
                throw new Error(response.message);
            }
            set({ isLoading: false });
        } catch (error: any) {
            console.error("Gagal mengaktifkan user:", error.message);
            set({ error: error.response?.data?.message || error.message, isLoading: false });
        }
    },

    forgotPassword: async (data) => {
        set({ isLoading: true, error: null });

        try {
            await forgotPassword(data);
            set({ isLoading: false });
        } catch (error: any) {
            console.error("Gagal mengirim permintaan lupa password:", error.message);
            set({ error: error.response?.data?.message || error.message, isLoading: false });
        }
    },

    logoutUser: () => {
        set({ user: null, profile: null });
        localStorage.removeItem("userToken");
        localStorage.removeItem("appToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("userImage");
    },

    fetchProfile: async () => {
        set({ isLoading: true, error: null });

        try {
            const userProfile = await getProfile();
            set({ profile: userProfile, isLoading: false });
            localStorage.setItem("userName", userProfile.name);
            if (userProfile.imageProfile) {
                localStorage.setItem("userImage", userProfile.imageProfile);
            }
        } catch (error: any) {
            console.error("Gagal mengambil profil:", error.message);
            set({ error: error.message, isLoading: false });
        }
    },

    updateUserProfile: async (profileData) => {
        set({ isLoading: true, error: null });

        try {
            await updateProfile(profileData);
            await get().fetchProfile();
        } catch (error: any) {
            console.error("Gagal memperbarui profil:", error.message);
            set({ error: error.message, isLoading: false });
        }
    },

    uploadUserProfileImage: async (file) => {
        set({ isLoading: true, error: null });

        try {
            const response = await uploadProfileImage(file);
            await get().fetchProfile();
            return response;
        } catch (error: any) {
            console.error("Gagal upload gambar:", error.message);
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    changePassword: async (data) => {
        set({ isLoading: true, error: null });

        try {
            await updatePassword(data);
            set({ isLoading: false });
        } catch (error: any) {
            console.error("Gagal mengganti password:", error.message);
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    fetchUsers: async (page = 1, limit = 10) => {
        set({ isLoading: true, error: null });

        try {
            const usersData = await getUsers(page, limit);
            set({ users: usersData, isLoading: false });
        } catch (error: any) {
            console.error("Gagal mengambil data users:", error.message);
            set({ error: error.message, isLoading: false });
        }
    },

    fetchUserDetails: async (guid) => {
        set({ isLoading: true, error: null });

        try {
            const userDetails = await getUserDetails(guid);
            set({ selectedUser: userDetails, isLoading: false });
        } catch (error: any) {
            console.error("Gagal mengambil detail user:", error.message);
            set({ error: error.message, isLoading: false });
        }
    },

    addUser: async (data) => {
        set({ isLoading: true, error: null });

        try {
            const response = await addUser(data);
            if (!response.success) {
                throw new Error(response.message);
            }
            await get().fetchUsers(); 
            set({ isLoading: false });
        } catch (error: any) {
            console.error("Gagal menambahkan user:", error.message);
            set({ error: error.response?.data?.message || error.message, isLoading: false });
        }
    },

    deleteUser: async (guid: string) => {
        set({ isLoading: true, error: null });
    
        try {
            await deleteUser(guid);
            await get().fetchUsers(); 
            set({ isLoading: false });
        } catch (error: any) {
            console.error("Gagal menghapus user:", error.message);
            set({ error: error.message, isLoading: false });
        }
    },

}));
