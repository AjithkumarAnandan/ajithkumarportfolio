"use client";
import { create } from "zustand";
export enum Sections {
  Home = "home",
  About = "about",
  Contact = "contact",
  Experience = "experience",
}
type ResumeStore = {
  section: Sections;
  setSection: (section: Sections) => void;
};
export const useResume = create<ResumeStore>((set) => ({
  section: Sections.Home, // default to enum value
  setSection: (section) => set({ section }),
}));
