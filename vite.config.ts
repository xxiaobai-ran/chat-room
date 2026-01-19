import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig((configEnv) => {
    return {
        plugins: [react()],
        base: process.env.NODE_ENV === 'production' ? './' : './',
        build: {
            outDir: 'output',
        },
    };
});
