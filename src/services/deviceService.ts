import { Device, DeviceListResponse, DeviceResponse } from "../interfaces/device";
import { projectApi } from "../utils/api";

export const getDevice = async (
    page: number = 1, 
    limit: number = 10,
    guidTree?: string 
  ): Promise<DeviceListResponse> => {
    try {
      const params: any = { page, limit };
      if (guidTree) {
        params.guidTree = guidTree; 
      }
  
      const response = await projectApi.get<DeviceListResponse>("/device", {
        params, 
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch devices");
    }
  };
  

export const getDeviceDetail = async (guid: string): Promise<Device> => {
    try {
        const response = await projectApi.get<DeviceResponse>(`/device/${guid}`);
        return response.data.data; 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch partner details");
    }
};

export const deleteDevice = async (guid: string): Promise<void> => {
    try {
        await projectApi.delete(`/device/${guid}`);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to delete partner");
    }
};