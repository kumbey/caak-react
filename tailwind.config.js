module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#F65A18',
                    DEFAULT: '#F65A18',
                    dark: '#F65A18'
                },
                fontPrimary: {
                    DEFAULT: "#21293C"
                }
            }
        },
    },
    variants: {
        extend: {placeholderColor: ['hover'],},
    },
    plugins: [require('@tailwindcss/forms')],
}
