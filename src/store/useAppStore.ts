import { create } from 'zustand';

export type UserRole = 'consultant' | 'landowner';

export interface LandHealthData {
  ndviScore: number;
  moistureLevel: number;
  status: 'good' | 'warning' | 'critical';
  lastUpdated: string;
}

export interface LandParcel {
  id: string;
  name: string;
  areaHa: number;
}

interface AppState {
  // App UI State
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  activeMapLayer: string;
  setActiveMapLayer: (layer: string) => void;
  
  // Application Data State
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  
  selectedParcel: LandParcel | null;
  setSelectedParcel: (parcel: LandParcel | null) => void;
  
  landHealthData: LandHealthData | null;
  setLandHealthData: (data: LandHealthData | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // App UI State
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  activeMapLayer: 'satellite',
  setActiveMapLayer: (layer) => set({ activeMapLayer: layer }),
  
  // Application Data State
  userRole: 'landowner',
  setUserRole: (role) => set({ userRole: role }),
  
  selectedParcel: null,
  setSelectedParcel: (parcel) => set({ selectedParcel: parcel }),
  
  landHealthData: null,
  setLandHealthData: (data) => set({ landHealthData: data }),
}));
