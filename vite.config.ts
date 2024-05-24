import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://192.168.219.200:8080',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
                secure: false,
                ws: true,
            },
        },
    },
    define: {
        'process.env.IS_PREACT': JSON.stringify('true'),
    },
    resolve: {
        alias: [{ find: '@', replacement: '/src' }],
    },
});
