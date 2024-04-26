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
        },
    },
    daisyui: {
        themes: ['light'],
    },
    plugins: [require('daisyui'), require('tailwind-scrollbar-hide'), require('@tailwindcss/typography')],
};
