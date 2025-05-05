export interface Device {
    _id: string;
    guidDevice: string;
    guidTree: string;
    device_type: string;
    value: string;
    additional_info: string;
    description: string;
    timestamp: string;
    __v: number;
}


export interface DeviceRequest {
    guidDevice: string;
    guidTree: string;
    device_type: string;
    value: string;
    additional_info: string;
    description: string;
}


export interface DeviceResponseData {
    totalPages: number;
    totalData: number;
    totalDataperPage: number;
    page: number;
    devices: Device[];
}

export interface DeviceResponse {
    statusCode: number;
    message: string;
    data: Device;
}


export interface DeviceSuccessResponse {
    statusCode: number;
    message: string;
    data: Device;
}

export interface ApiResponse<T> {
    statusCode: number;
    message: string;
    data?: T;
}


export type DeviceListResponse = ApiResponse<DeviceResponseData>;
