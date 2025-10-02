import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      '083f85097aa1.ngrok-free.app',       // Allow a specific domain
      '.subdomain.com',        // Allow a domain and all its subdomains
      '192.168.1.100',         // Allow a specific IP address
      'localhost'              // Allowed by default, but can be explicitly included
    ],
    // Other server options like port, host, etc.
  },
})
