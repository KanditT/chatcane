import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // เปิด dark mode ด้วย class
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          light: "#ffffff",
          dark: "#6b21a8",
        },
        text: {
          light: "#111827",
          dark: "#f3e8ff",
        },
      },
    },
  },
  plugins: [],
};

export default config;
