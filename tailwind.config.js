module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      maxHeight: {
        half: "50vh",
      },
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
        button: "0px 1px 3px rgba(0, 0, 0, 0.15)",
      },
      screens: {
        'ph': {'min': '200px', 'max': '499px'},
        'btn': {'min': '400px', 'max': '751px'},
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
          posthover: "#F5F5F5",
          shiroiwhite: "#E8F6EE",
          algalfuel: "#2FC474",
          boilingmagma: "#FE3400",
          buffalosauce: "#F65A18",
          bleachedsilk1: "#F3F3F3",
          bleudefrance: "#367CE6",
          generalblack: "#21293C",
          secondprimary: "#F54000",
          mortargrey: "#9E9E9E",
          twitter: "#1DA1F2",
          facebook: "#1877F2",
          shit: "#AFAFAF",
          red: "#E60033",
          darkgray: "#A7A9AB",
          whitesmoke: "#f5f5f5",
          peachbreeze: "#FEECE5",
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
        "20px": "20px",
        "22px": "22px",
        "24px": "24px",
        "26px": "26px",
        "28px": "28px",
        "30px": "30px",
        "40px": "40px",
        "44px": "44px",
        "56px": "56px",
      },
      fontFamily: {
        roboto: ["Roboto"],
      },
      spacing: {
        a1: "6px",
        a3: "7px",
        a2: "8px",
        b1: "10px",
        b3: "11px",
        b2: "12px",
        b6: "13px",
        c6: "15px",
        b5: "16px",
        b4: "17px",
        c1: "18px",
        c11: "20px",
        c2: "25px",
        c34: "28px",
        c4: "29px",
        c3: "30px",
        c24: "32px",
        c8: "35px",
        c25: "36px",
        c32: "37px",
        c13: "40px",
        c27: "41px",
        c37: "42px",
        c5: "43px",
        c9: "44px",
        c30: "48px",
        c28: "52px",
        c15: "55px",
        c20: "68px",
        c60: "60px",
        c7: "70px",
        c33: "72px",
        c29: "78px",
        c19: "90px",
        c31: "92px",
        c35: "97px",
        c14: "118px",
        c132: "132px",
        c36: "146px",
        c10: "155px",
        c12: "181px",
        c17: "196px",
        c26: "226px",
        c23: "240px",
        c22: "275px",
        c18: "278px",
        ch: "300px",
        ci: "320px",
        cf: "356px",
        ce: "370px",
        ca: "390px",
        cb: "400px",
        cc: "450px",
        ck: "740px",
        cg: "854px",
      },
    },
  },
  variants: {
    extend: { placeholderColor: ["hover"], opacity: ["group-hover"] },
  },
  plugins: [require("@tailwindcss/forms")],
};
