import { create } from "zustand";

type OnLocationState = {
    onLocation: number;
    setOnLocation: (value: number) => void;
};

export const useOnLocationStore = create<OnLocationState>((set) => ({
    onLocation: 0,
    setOnLocation: (value) => set({ onLocation: value }),
}));