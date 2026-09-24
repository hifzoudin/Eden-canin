import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite hides every env var from the browser unless the name starts with one of these.
  envPrefix: ["VITE_", "SUPABASE_"]
})
