/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#0077FF",
        background: "#F5F7FA",
        text: "#2D3748",
        accent: "#FF6B6B",
        success: "#28C76F",
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0077FF",
          secondary: "#FF6B6B",
          accent: "#28C76F",
          neutral: "#2D3748",
          "base-100": "#F5F7FA",
        },
      },
    ],
  },
};
