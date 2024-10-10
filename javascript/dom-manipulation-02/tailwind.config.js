/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        modal: "animateModal 0.4s linear",
      },
      keyframes: {
        animateModal: {
          "0%": { top: "-300px", opacity: "0" },
          "100%": { top: "50%", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
