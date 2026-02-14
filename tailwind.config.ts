import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fafaf8",
        foreground: "#1a1a1a",
        muted: "#6b6b6b",
        border: "#e5e5e3",
        accent: "#b45309",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "Menlo", "monospace"],
      },
      screens: {
        toc: "1360px",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "72ch",
            lineHeight: "1.8",
            fontSize: "17px",
            color: "#1a1a1a",
            "h1, h2, h3, h4": {
              fontFamily: "var(--font-serif)",
              letterSpacing: "-0.025em",
              color: "#1a1a1a",
            },
            h2: {
              marginTop: "2.5em",
            },
            a: {
              color: "#1a1a1a",
              textDecorationColor: "#d4c5b0",
              textUnderlineOffset: "3px",
              transition: "text-decoration-color 0.2s ease",
              "&:hover": {
                textDecorationColor: "#b45309",
              },
            },
            code: {
              backgroundColor: "#f5f5f3",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              fontWeight: "400",
              "&::before": { content: "none" },
              "&::after": { content: "none" },
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
            },
            pre: {
              backgroundColor: "#f5f5f3",
              borderRadius: "0.5rem",
            },
            blockquote: {
              fontStyle: "normal",
              borderLeftWidth: "3px",
              borderLeftColor: "#e5e5e3",
            },
            img: {
              borderRadius: "0.5rem",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
