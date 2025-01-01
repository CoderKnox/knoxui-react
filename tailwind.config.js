/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",
        ghost: "var(--color-ghost)",
        "base-100": "var(--color-base-100)",
        "base-200": "var(--color-base-200)",
        "base-300": "var(--color-base-300)",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
      },
      borderRadius: {
        xs: "0.125rem",
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        soft: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
        inset: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [
    function ({ addUtilities, variants }) {
      const newUtilities = {
        ".animate-ripple": {
          "@keyframes ripple": {
            "0%": { transform: "scale(0)", opacity: "1" },
            "100%": { transform: "scale(4)", opacity: "0" },
          },
          animation: "ripple 0.6s linear",
        },
        ".animate-pulse": {
          "@keyframes pulse": {
            "0%, 100%": { opacity: "1" },
            "50%": { opacity: "0.5" },
          },
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        },
        ".animate-pop": {
          "@keyframes pop": {
            "0%": { transform: "scale(0.95)" },
            "40%": { transform: "scale(1.02)" },
            "100%": { transform: "scale(1)" },
          },
          animation: "pop 0.3s ease-in-out",
        },
      };
      addUtilities(newUtilities, variants("animation"));
    },
  ],
};

