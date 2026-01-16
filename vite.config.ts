import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
console.log('process', process.env.NODE_ENV);
export default defineConfig((configEnv) => {
	console.log('configEnv', configEnv);
	return {
		plugins: [react()],
		base: process.env.NODE_ENV === 'production' ? './' : './',
		build: {
			outDir: 'output'
		}
	}
});
