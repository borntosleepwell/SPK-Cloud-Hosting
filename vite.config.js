import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Website--ELECTRE/', // Ubah dengan nama repository Anda
})

