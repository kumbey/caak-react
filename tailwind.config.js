module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#F65A18",
          DEFAULT: "#F65A18",
          hover: "#F65A60",
          dark: "#F65A18",
        },
        darkblue: {
          DEFAULT: "#6C7392",
        },
        blue:{
          primary: "#4B587C",
          verified: "#2196F3"
        },
        generalblack: {
          DEFAULT: "#21293C",
        },
        gray: {
          primary: "#666666",
        },
        fontPrimary: {
          DEFAULT: "#21293C",
        },
        facebook: {
          DEFAULT: "#5f73a7",
          hover: "#4e5f8a",
        },
      },
      fontFamily: {
        inter: ["Inter"],
      },
    },
  },
  variants: {
    extend: { placeholderColor: ["hover"] },
  },
  plugins: [require("@tailwindcss/forms")],
};
