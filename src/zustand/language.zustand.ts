import { create } from "zustand";

// Create a Zustand store
const useLanguageStore = create<{
  lang: string;
  setLang: (lang: string) => void;
}>((set) => ({
  lang: "en", // default language
  setLang: (lang: string) => set({ lang }),
  // function to update language
}));

export default useLanguageStore;
