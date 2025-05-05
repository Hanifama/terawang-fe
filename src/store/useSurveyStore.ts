import { create } from "zustand";
import { Survey } from "../interfaces/survey";
import { getSurveyList, getSurveyDetail, deleteSurvey } from "../services/surveyService";

interface SurveyStore {
  surveys: Survey[];
  allSurveys: Survey[]; // Kalau perlu nampung semua, misal untuk dropdown atau filter global
  selectedSurvey: Survey | null;

  totalData: number;
  totalPages: number;
  totalDataperPage: number;
  page: number;

  loading: boolean;
  error: string | null;

  fetchSurveys: (page?: number, limit?: number, guidTree?: string) => Promise<void>;
  fetchSurveyDetail: (guidSurvey: string) => Promise<void>;
  setPage: (page: number) => void;
  removeSurvey: (guidSurvey: string) => Promise<void>;
}

export const useSurveyStore = create<SurveyStore>((set, get) => ({
  surveys: [],
  allSurveys: [],
  selectedSurvey: null,

  totalData: 0,
  totalPages: 0,
  totalDataperPage: 0,
  page: 1,

  loading: false,
  error: null,

  fetchSurveys: async (page = 1, limit = 10, guidTree?: string) => {
    set({ loading: true, error: null });

    try {
      const response = await getSurveyList(page, limit, guidTree);
      const surveyData = response.data;

      if (!surveyData) throw new Error("Invalid API response");

      set({
        surveys: surveyData.surveys,
        allSurveys: surveyData.surveys,
        totalData: surveyData.totalData,
        totalPages: surveyData.totalPages,
        totalDataperPage: surveyData.totalDataperPage,
        page: surveyData.page,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch surveys", loading: false });
    }
  },

  fetchSurveyDetail: async (guidSurvey) => {
    set({ loading: true, error: null });

    try {
      const survey = await getSurveyDetail(guidSurvey);
      set({ selectedSurvey: survey, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch survey detail", loading: false });
    }
  },

  setPage: (page) => set({ page }),

  removeSurvey: async (guidSurvey) => {
    set({ loading: true, error: null });

    try {
      await deleteSurvey(guidSurvey);
      await get().fetchSurveys(get().page);
    } catch (error: any) {
      set({ error: error.message || "Failed to delete survey", loading: false });
    }
  },
}));
