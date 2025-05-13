import { create } from "zustand";

const textures = ["/images/global/texture/1.jpeg", "/images/global/texture/2.jpeg", "/images/global/texture/3.jpeg"];

interface AnimationStore {
  index: number;
  texture: string;
  setIndex: (num: number) => void;
}

export const useAnimation = create<AnimationStore>((set) => ({
  index: 0,
  texture: textures[1],
  setIndex: (num: number) => set({ index: num, texture: textures[num] }),
}));