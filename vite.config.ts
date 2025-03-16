import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// تحميل المتغيرات البيئية
import { config } from 'dotenv';
config();

export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    // تعريف المتغيرات البيئية التي تحتاجها
    'import.meta.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY),
    'import.meta.env.VITE_BACKUP_API_KEY': JSON.stringify(process.env.VITE_BACKUP_API_KEY)
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});