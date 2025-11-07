import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/guessthechd/', // must exactly match the repo name (case-sensitive)
})
