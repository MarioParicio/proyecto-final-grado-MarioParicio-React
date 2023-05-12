import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components', // Ejemplo de alias para la carpeta de componentes
      '@assets': '/src/assets', // Ejemplo de alias para la carpeta de assets
      // Agrega más alias según tus necesidades
    },
  },
});