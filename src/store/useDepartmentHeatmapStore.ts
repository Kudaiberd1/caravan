import { create } from "zustand";
import type {DepartmentStaffing} from "../pages/Dashboard.tsx";

type HeatmapState = {
    heatmap: DepartmentStaffing[];
    setHeatmap: (value: DepartmentStaffing[]) => void;
};

export const useDepartmentHeatmapStore = create<HeatmapState>((set) => ({
    heatmap: [],
    setHeatmap: (value) => set({ heatmap: value }),
}));