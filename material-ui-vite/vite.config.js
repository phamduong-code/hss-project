import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        allowedHosts: ['3358634b0d25.ngrok-free.app'],
    },
});
