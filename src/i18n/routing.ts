import { defineRouting } from "next-intl/routing";
export const routing = defineRouting({
  locales: ["en", "ta"],
  defaultLocale: "en",
  localeDetection: true,
  localePrefix: "always",
});
