module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'class', // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      letterSpacing: {
        "17px": "17px",
        "18px": "18px",
        "19px": "19px",
      },
      borderRadius: {
        square: "8px",
      },
      boxShadow: {
        dropdown: "0 3px 20px rgba(0, 0, 0, 0.25)",
        card: "0px 1px 2px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        caak: {
          primary: "#f64900",
          primaryHover: "#F65A60",
          bleachedsilk: "#F2F2F2",
          aleutian: "#9A9FB4",
          liquidnitrogen: "#F3F3F4",
          1: "rgba(0, 0, 0, 0.16)",
          titaniumwhite: "#E4E4E5",
          upscale: "#A8AEC1",
          darkBlue: "#6C7392",
          extraBlack: "#0D1026",
          blue: "#4B587C",
          2: "rgba(0, 0, 0, 0.15)",
          3: "rgba(0, 0, 0, 0.1)",
          yinbaisilver: "#E0E0E1",
          panipuri: "#F4AD57",
          hotembers: "#F75831",
          bluishpurple: "#6C41E4",
          blueoystercult: "#5079F1",
          iceclimber: "#2DEBD9",
          buttonblue: "#2196F3",
          christmassilver: "#E0E0E0",
          mercury: "#EBEBEB",
          shiroiwhite: "#E8F6EE",
          algalfuel: "#2FC474",
          boilingmagma: "#FE3400",
          buffalosauce: "#F65A18",
          bleachedsilk1: "#F3F3F3",
          bleudefrance: "#367CE6",
          generalblack: "#21293C",
          secondprimary: "#F54000",
          twitter: "#1DA1F2",
          facebook: "#1877F2",
          shit: "#AFAFAF",
          red: "#E60033"
        },
        darkblue: {
          DEFAULT: "#6C7392",
        },
        blue: {
          primary: "#4B587C",
          verified: "#2196F3",
        },
        gray: {
          primary: "#666666",
        },
        facebook: {
          DEFAULT: "#5f73a7",
          hover: "#4e5f8a",
        },
      },
      fontSize: {
        "12px": "12px",
        "13px": "13px",
        "14px": "14px",
        "15px": "15px",
        "16px": "16px",
        "17px": "17px",
        "18px": "18px",
        "24px": "24px",
        "32px": "32px", 
        "44px": "44px",
        "56px": "56px"
      },
      fontFamily: {
        roboto: ["Roboto"],
      },
      spacing: {
        b1: "10px",
        b2: "12px",
        b3: "11px",
        c6: "15px",
        c1: "18px",
        c2: "25px",
        c4: "29px",
        c3: "30px",
        c13: "40px",
        c5: "43px",
        c7: "70px",
        c15: "55px",
        c8: "35px",
        c9: "44px",
        c11: "20px",
        c19: "90px",
        c14: "118px",
        c10: "155px",
        c12: "181px",
        c17: "196px",
        c18: "278px",
        cb: "400px",
        cc: "450px",
        ca: "390px",
        ce: "370px",
        ci: "320px",
        cd: "300px"
      }
    }
  },
  variants: {
    extend: { placeholderColor: ["hover"] },
  },
  plugins: [require("@tailwindcss/forms")],
};
