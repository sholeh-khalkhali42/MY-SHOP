import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // می‌تونی تغییرش بدی
  },
  resolve: {
    alias: {
      '@': '/src',  // برای وارد کردن راحت‌تر فایل‌ها
    },
  },
});
