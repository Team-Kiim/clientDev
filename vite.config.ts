import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [react(), basicSsl()],
        server: {
            proxy: {
                '/api': {
                    target: `${env.VITE_SERVER_URL}`,
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, ''),
                    secure: true,
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
    };
});
