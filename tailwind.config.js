/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        'blockquote p:first-of-type::before': false,
                        'blockquote p:first-of-type::after': false,
                    },
                },
            },
            colors: {
                'plump-purple': {
                    50: '#f0f2fd',
                    100: '#e4e7fb',
                    200: '#ced2f7',
                    300: '#b0b4f1',
                    400: '#9190e9',
                    500: '#7e75df',
                    600: '#6d5ad1',
                    700: '#5946b2',
                    800: '#4d3e95',
                    900: '#413877',
                    950: '#272145',
                },
            },
        },
    },
    daisyui: {
        themes: ['light'],
    },
    plugins: [require('daisyui'), require('tailwind-scrollbar-hide'), require('@tailwindcss/typography')],
};
