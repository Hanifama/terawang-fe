import { create } from "zustand";
import { Device, DeviceResponseData } from "../interfaces/device";
import { deleteDevice, getDevice, getDeviceDetail } from "../services/deviceService";

interface DeviceStore {
  devices: Device[];
  allDevices: Device[];
  selectedDevice: Device | null;
  totalData: number;
  totalType: number;
  totalTypeData: number;
  page: number;
  loading: boolean;
  error: string | null;
  fetchDevices: (page?: number, limit?: number, guidTree?: string) => Promise<void>;
  fetchDeviceDetail: (guid: string) => Promise<void>;
  setPage: (page: number) => void;
  removeDevice: (guid: string) => Promise<void>;
}

export const useDeviceStore = create<DeviceStore>((set, get) => ({
  devices: [],
  allDevices: [],
  selectedDevice: null,
  totalData: 0,
  totalType: 0,
  totalTypeData: 0,
  page: 1,
  loading: false,
  error: null,

  fetchDevices: async (page = 1, limit = 10, guidTree?: string) => {
    set({ loading: true, error: null });

    try {
      const response = await getDevice(page, limit, guidTree);

      if (response.data) {
        const devicesData: DeviceResponseData = response.data;

        set({
          devices: devicesData.devices,
          totalData: devicesData.totalData,
          page: devicesData.page,
          loading: false,
        });
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch devices", loading: false });
    }
  },

  fetchDeviceDetail: async (guid) => {
    set({ loading: true, error: null });

    try {
      const device = await getDeviceDetail(guid);
      set({ selectedDevice: device, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch device detail", loading: false });
    }
  },

  setPage: (page) => set({ page }),

  removeDevice: async (guid) => {
    set({ loading: true, error: null });

    try {
      await deleteDevice(guid);
      await get().fetchDevices(get().page);
    } catch (error: any) {
      set({ error: error.message || "Failed to delete device", loading: false });
    }
  },
}));
