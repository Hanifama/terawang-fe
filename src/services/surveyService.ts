import { Survey, SurveyListResponse, SurveyResponse } from "../interfaces/survey";
import { projectApi } from "../utils/api";


export const getSurveyList = async (
  page: number = 1,
  limit: number = 10,
  guidTree?: string
): Promise<SurveyListResponse> => {
  try {
    const params: any = { page, limit };
    if (guidTree) {
      params.guidTree = guidTree;
    }

    const response = await projectApi.get<SurveyListResponse>("/survey", {
      params,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch surveys");
  }
};

export const getSurveyDetail = async (guidSurvey: string): Promise<Survey> => {
  try {
    const response = await projectApi.get<SurveyResponse>(`/survey/${guidSurvey}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch survey detail");
  }
};


export const deleteSurvey = async (guidSurvey: string): Promise<void> => {
  try {
    await projectApi.delete(`/survey/${guidSurvey}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete survey");
  }
};

