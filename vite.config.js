import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project Pages URL: https://techwithanmol.github.io/Geeta-Web-Services/
export default defineConfig({
  base: '/Geeta-Web-Services/',
  plugins: [react()],
})
