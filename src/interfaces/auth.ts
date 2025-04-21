export interface BaseResponse {
    success: boolean;
    message: string;
    statusCode: number;
}

export interface LoginRequest {
    email: string;
    password: string;
    guidApplication: string;
}

export interface LoginData {
    appToken: string;
    userToken: string;
    refreshToken: string;
}

export interface LoginResponse extends BaseResponse {
    data: LoginData;
}

export interface Application {
    name: string;
    guidApplication: string;
    role: string;
    key: string;
    isActive: boolean;
    otp: string;
    _id: string;
    companyGuid?: string;
}

export interface UserProfile {
    guid: string;
    name: string;
    email: string;
    createdAt: string;
    code: string;
    applications: Application[];
    address?: string;
    role?: string;
    status?: string;
    phoneNumber: string;
    imageProfile?: string;
    updatedAt: string;
}

export interface ProfileResponse extends BaseResponse {
    data: {
        user: UserProfile;
    };
}

export interface UpdateProfileRequest {
    newName?: string;
    newPhoneNumber?: string;
    newAddress?: string;
}

export interface RegisterRequest {
    companyGuid: string;
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    guidApplication: string;
    role: string;
}

export interface Company {
    guid: string;
    name: string;
    code: string;
    type: string;
    updatedAt?: string;
}

export interface CompanyResponse extends BaseResponse {
    data: {
        companies: Company[];
        total: number;
        page: number;
        totalPages: number;
    };
}

export interface ActivateRequest {
    email: string;
    guidApplication: string;
    otp: string;
}

export interface UpdatePasswordRequest {
    email: string;
    currentPassword: string;
    newPassword: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

// User Management
export interface User {
    _id: string;
    guid: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    code: string;
    phoneNumber: string;
    address?: string; 
    imageProfile?: string; 
    applications: Application[];
}

export interface Application {
    name: string;
    guidApplication: string;
    role: string;
    key: string;
    isActive: boolean;
    otp: string;
    _id: string;
    companyGuid?: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface UserResponse {
    success: boolean;
    message: string;
    data: {
        users: User[];
        pagination: Pagination;
    };
    statusCode: number;
}

export interface IUserAddRequest {
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    guidApplication: string;
    role: string;
}

export interface IApiResponse {
    success: boolean;
    message: string;
    statusCode: number;
}

export interface ApiDetailUserResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
    };
    statusCode: number;
};



// Reuse BaseResponse untuk response standar
export type RegisterResponse = BaseResponse;
export type UpdateProfileResponse = BaseResponse;
export type UploadResponse = BaseResponse;
export type UpdatePasswordResponse = BaseResponse;
export type ForgotPasswordResponse = BaseResponse;
export type ActivateResponse = BaseResponse;
