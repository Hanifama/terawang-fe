
import { Tree, TreeListResponse, TreeRequest, TreeResponse, TreeSuccesResponse } from "../interfaces/tree";
import { projectApi } from "../utils/api";

export const getTree = async (page: number = 1, limit: number = 10): Promise<TreeListResponse> => {
    try {
        const response = await projectApi.get<TreeListResponse>("/tree", {
            params: { page, limit }, 
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch partners");
    }
};

export const getTreeDetail = async (guid: string): Promise<Tree> => {
    try {
        const response = await projectApi.get<TreeResponse>(`/tree/${guid}`);
        return response.data.data; 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch partner details");
    }
};


export const createPartner = async (partnerData: TreeRequest): Promise<TreeSuccesResponse> => {
    try {
        const response = await projectApi.post<TreeResponse>("/partners", partnerData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to create partner");
    }
};

export const updatePartner = async (guid: string, partnerData: TreeRequest): Promise<TreeSuccesResponse> => {
    try {
        const response = await projectApi.put<TreeResponse>(`/partners/${guid}`, partnerData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to update partner");
    }
};

export const deleteTree = async (guid: string): Promise<void> => {
    try {
        await projectApi.delete(`/tree/${guid}`);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to delete partner");
    }
};
