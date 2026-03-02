import { create } from "zustand";
import type {ActiveAnomaly} from "../data.ts";

type AnomalyState = {
    anomaly: ActiveAnomaly[];
    setAnomaly: (value: ActiveAnomaly[]) => void;
};

export const useAnomalyStore = create<AnomalyState>((set) => ({
    anomaly: [],
    setAnomaly: (value) => set({ anomaly: value }),
}));