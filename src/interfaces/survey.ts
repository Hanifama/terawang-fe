export interface SensorData {
    _id: string;
    guidDevice: string;
    sensorType: string;
    value: string;
}

export interface GenerateAI {
    _id: string;
    imageUrl: string;
    result: string;
    value: number;
}

export interface Survey {
    _id: string;
    guidSurvey: string;
    guidTree: string;
    surveyorName: string;
    surveyDate: string;
    sensorData: SensorData[];
    generateAI: GenerateAI[];
    description: string;
    photo: string | null;
    createdDt: string;
    __v: number;
}

export interface SurveyResponse {
    statusCode: number;
    message: string;
    data: Survey;
}

export interface SurveyResponseData {
    totalPages: number;
    totalData: number;
    totalDataperPage: number;
    page: number;
    surveys: Survey[];
}

export interface ApiResponse<T> {
    statusCode: number;
    message: string;
    data?: T;
}


export type SurveyListResponse = ApiResponse<SurveyResponseData>;
