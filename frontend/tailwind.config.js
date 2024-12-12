/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "subtle-bounce": "subtle-bounce 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        drift: "drift 5s ease-in-out infinite",
        "drift-reverse": "drift-reverse 5s ease-in-out infinite",
        "spin-slow": "spin-slow 3s linear infinite",
        particle: "particle 10s linear infinite",
        "gradient-text": "gradient-text 5s ease infinite",
        popup: "popup 0.4s ease-out",
        "subtle-bounce": "subtle-bounce 3s ease-in-out infinite",
        "gradient-text": "gradient-text 5s ease infinite",
        "slide-down": "slide-down 0.3s ease-out",
      },
      keyframes: {
        "subtle-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(20px, -20px) rotate(10deg)" },
        },
        "drift-reverse": {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(-20px, 20px) rotate(-10deg)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        particle: {
          "0%": { transform: "scale(1) translateY(0)", opacity: "0.5" },
          "100%": { transform: "scale(0.5) translateY(100vh)", opacity: "0" },
        },
        "gradient-text": {
          "0%, 100%": {
            "background-position": "0% 50%",
            color: "theme(colors.emerald.600)",
          },
          "50%": {
            "background-position": "100% 50%",
            color: "theme(colors.green.700)",
          },
        },
        popup: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
    plugins: [],
  },
};
