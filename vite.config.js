/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // یا 'jsdom' اگر خطا ادامه داشت
    globals: true,
    isolate: false,
    setupFiles: './src/setupTests.js', // 👈 این خط حتماً اضافه بشه
  },
})
