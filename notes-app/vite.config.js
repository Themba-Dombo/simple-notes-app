import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This proxy forwards requests from /api to our backend server
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.PORT || '8080'}`, // The address of our backend
        changeOrigin: true,
      },
    }
  }
})
