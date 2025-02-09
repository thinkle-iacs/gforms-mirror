/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/svelte/**/*.{html,svelte}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color, #2563eb)", // Default to Tailwind Blue-600
        primaryDark: "var(--primary-dark, #1d4ed8)", // Darker version
        secondary: "var(--secondary-color, #9333ea)",
        secondaryDark: "var(--secondary-dark, #7c2de2)", // Auto-darkened
        success: "var(--success-color, #16a34a)", // Green-600
        error: "var(--error-color, #dc2626)", // Red-600
        background: "var(--bg-color, #ffffff)",
        text: "var(--text-color, #1f2937)",
        mutedText: "var(--muted-text, #6b7280)", // Muted gray text
        input: "var(--input-bg-color, #f9fafb)", // Input backgrounds
        inputText: "var(--input-text-color, #111827)", // Input text color
        inputBorder: "var(--input-border-color, #d1d5db)", // Input border
        inputFocus: "var(--input-focus-color, #2563eb)", // Focus state
        link: "var(--link-color, #2563eb)", // Links default to primary
        hoverBg: "var(--hover-bg, #1d4ed8)", // Dynamically darkened hover color
      },
      fontFamily: {
        ui: "var(--font-family, sans-serif)", // General UI font
        input: "var(--input-font, sans-serif)", // Input-specific font
      },
    },
  },
  plugins: [],
};