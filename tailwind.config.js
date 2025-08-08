/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // or adjust if you're not using src/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  extend: {
    animation: {
      float: "float 3s ease-in-out infinite",
      "zoom-slow": "zoomSlow 20s ease-in-out infinite",
    },
    keyframes: {
      float: {
        "0%, 100%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-6px)" },
      },
      zoomSlow: {
        "0%": { transform: "scale(1)" },
        "100%": { transform: "scale(1.1)" },
      },
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide")], // 👈 Add DaisyUI here
};
