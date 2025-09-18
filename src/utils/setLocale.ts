// utils/setLocale.ts
export function setLocale(locale: string) {
  // Store in localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("locale", locale);
  }

  // Store in cookie (so middleware can read it server-side)
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
}
