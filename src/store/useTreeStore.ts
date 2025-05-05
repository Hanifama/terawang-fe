import { create } from "zustand";

import { Tree, TreeResponseData } from "../interfaces/tree";
import { deleteTree, getTree, getTreeDetail } from "../services/treeService";

interface TreeStore {
  trees: Tree[];
  allTrees: Tree[];
  selectedTree: Tree | null; 
  totalData: number;  
  page: number;
  loading: boolean;
  error: string | null;  
  // fetchAllTreesWithoutFilter: (name?: string, type?: string) => Promise<void>;
  // fetchAllPartnersWithoutMapDasboard: (name?: string, type?: string) => Promise<void>;
  fetchTrees: (page?: number, limit?: number) => Promise<void>;
  fetchPartnerDetail: (guid: string) => Promise<void>; 
  setPage: (page: number) => void;
  removeTree: (guid: string) => Promise<void>;
  // addPartner: (partnerData: PartnerRequest) => Promise<void>;
  // updatePartner: (guid: string, partnerData: PartnerRequest) => Promise<void>;
}

export const useTreeStore = create<TreeStore>((set, get) => ({
  trees: [],
  allTrees: [],
  selectedTree: null,
  totalData: 0,
  totalType: 0,
  totalTypeData: 0,
  page: 1,
  loading: false,
  error: null,

  // fetchAllPartnersWithoutMapDasboard: async (name, type) => {
  //   set({ loading: true, error: null });

  //   try {
  //     const response = await getAllPartnersWithoutMapsDashboard(name, type);

  //     if (response.data) {
  //       set({
  //         allTrees: response.data.partners,
  //         totalData: response.data.totalData,
  //         totalType: response.data.totalType,
  //         totalTypeData: response.data.totalTypeData,
  //         loading: false,
  //       });
  //     } else {
  //       throw new Error("Invalid API response");
  //     }
  //   } catch (error: any) {
  //     set({ error: error.message || "Failed to fetch partners without filter", loading: false });
  //   }
  // },

  // fetchAllTreesWithoutFilter: async () => {
  //   set({ loading: true, error: null });

  //   try {
  //     const response = await getAllPartnersWithoutFilter(name, type);

  //     if (response.data) {
  //       set({
  //         allTrees: response.data.partners,
  //         totalData: response.data.totalData,
  //         totalType: response.data.totalType,
  //         totalTypeData: response.data.totalTypeData,
  //         loading: false,
  //       });
  //     } else {
  //       throw new Error("Invalid API response");
  //     }
  //   } catch (error: any) {
  //     set({ error: error.message || "Failed to fetch partners without filter", loading: false });
  //   }
  // },

  fetchTrees: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });

    try {
      const response = await getTree(page, limit);

      if (response.data) {
        const treesData: TreeResponseData = response.data;

        set({
          trees: treesData.trees,
          totalData: treesData.totalData,
          page: treesData.page,
          loading: false,
        });
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch partners", loading: false });
    }
  },

  fetchPartnerDetail: async (guid) => {
    set({ loading: true, error: null });

    try {
      const tree = await getTreeDetail(guid);
      set({ selectedTree: tree, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch partner detail", loading: false });
    }
  },

  setPage: (page) => set({ page }),

  // addPartner: async (partnerData) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const response = await createPartner(partnerData);
  //     if (response.statusCode === 201) {
  //       await get().fetchPartners(get().page); 
  //     }
  //     set({ loading: false });
  //   } catch (error: any) {
  //     set({ error: error.message || "Gagal menambahkan mitra", loading: false });
  //   }
  // },

  // updatePartner: async (guid, partnerData) => {
  //   set({ loading: true, error: null });
  //   try {
  //     await updatePartner(guid, partnerData);
  //     await get().fetchPartners(get().page); 
  //     set({ loading: false });
  //   } catch (error: any) {
  //     set({ error: error.message || "Gagal memperbarui mitra", loading: false });
  //   }
  // },

  removeTree: async (guid) => {
    set({ loading: true, error: null });
    try {
      await deleteTree(guid);
      await get().fetchTrees(get().page);
    } catch (error: any) {
      set({ error: error.message || "Gagal menghapus mitra", loading: false });
    }
  },
}));
