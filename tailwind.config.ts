import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "link-underline": "rgb(var(--link-underline) / <alpha-value>)",
        "code-bg": "rgb(var(--code-bg) / <alpha-value>)",
        selection: "rgb(var(--selection) / <alpha-value>)",
        "tag-bg": "rgb(var(--tag-bg) / <alpha-value>)",
        "prose-body": "rgb(var(--prose-body) / <alpha-value>)",
      },
      fontFamily: {
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
            fontSize: "19px",
            color: "rgb(var(--prose-body))",
            "h1, h2, h3, h4": {
              fontFamily: "var(--font-serif)",
              letterSpacing: "-0.025em",
              color: "rgb(var(--foreground))",
            },
            "h2, h3, h4": {
              scrollMarginTop: "6rem",
            },
            strong: {
              color: "rgb(var(--foreground))",
            },
            h2: {
              marginTop: "2.5em",
            },
            code: {
              color: "rgb(var(--foreground))",
              backgroundColor: "rgb(var(--code-bg))",
              fontSize: "0.875em",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              fontWeight: "400",
              "&::before": { content: "none" },
              "&::after": { content: "none" },
            },
            "ol > li::marker": {
              color: "rgb(var(--muted))",
            },
            "ul > li::marker": {
              color: "rgb(var(--muted))",
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
            },
            pre: {
              backgroundColor: "rgb(var(--code-bg))",
              borderRadius: "0.5rem",
            },
            blockquote: {
              fontStyle: "normal",
              color: "rgb(var(--foreground))",
              borderLeftWidth: "3px",
              borderLeftColor: "rgb(var(--border))",
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
