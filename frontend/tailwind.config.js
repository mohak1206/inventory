/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      /* ── Architectural Ledger Color Tokens ── */
      colors: {
        /* Brand */
        primary:              "#004048",
        "primary-container":  "#005963",
        "on-primary":         "#ffffff",
        "primary-fixed-dim":  "#4fd8eb",

        /* Surfaces (layering hierarchy) */
        surface:              "#f7f9ff",
        "surface-low":        "#f1f4fa",
        "surface-lowest":     "#ffffff",
        "surface-high":       "#e5e9ef",
        "surface-highest":    "#dfe3e8",

        /* On-surface */
        "on-surface":         "#181c20",

        /* Outlines */
        outline:              "#6f797b",
        "outline-variant":    "#bfc8ca",

        /* Secondary (Success) */
        "secondary-container":       "#d0ffd6",
        "on-secondary-container":    "#00210a",

        /* Error */
        "error-container":           "#ffdad6",
        "on-error-container":        "#410002",

        /* Tertiary (Warning) */
        "tertiary-container":        "#ffdea8",
        "on-tertiary-container":     "#261900",
      },

      /* ── Typography ── */
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        body:    ["Inter", "sans-serif"],
      },

      /* ── Elevation ── */
      boxShadow: {
        ambient: "0 20px 40px rgba(24, 28, 32, 0.06)",
      },

      /* ── Roundedness ── */
      borderRadius: {
        lg:   "0.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
