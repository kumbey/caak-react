module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#F65A18',
                    DEFAULT: '#F65A18',
                    hover: '#F65A60',
                    dark: '#F65A18'
                },
                gray: {
                    primary: "#666666"
                },
                fontPrimary: {
                    DEFAULT: "#21293C"
                },
                facebook: {
                    DEFAULT: "#5f73a7",
                    hover: "#4e5f8a"
                }
            },
            fontFamily: {
                'inter': ['Inter']
            }
        },
    },
    variants: {
        extend: {placeholderColor: ['hover'],},
    },
    plugins: [require('@tailwindcss/forms')],
}
