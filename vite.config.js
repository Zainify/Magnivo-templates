import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    host: true,
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cleaner1_index: resolve(__dirname, 'cleaner/1/index.html'),
        cleaner1_services: resolve(__dirname, 'cleaner/1/services.html'),
        cleaner1_locations: resolve(__dirname, 'cleaner/1/locations.html'),
        cleaner1_gallery: resolve(__dirname, 'cleaner/1/gallery.html'),
        cleaner1_blog: resolve(__dirname, 'cleaner/1/blog.html'),
        cleaner1_about: resolve(__dirname, 'cleaner/1/about.html'),
        cleaner1_calculator: resolve(__dirname, 'cleaner/1/calculator.html'),
        cleaner1_contact: resolve(__dirname, 'cleaner/1/contact.html'),
        cleaner2_index: resolve(__dirname, 'cleaner/2/index.html'),
        cleaner2_services: resolve(__dirname, 'cleaner/2/services.html'),
        cleaner2_estimator: resolve(__dirname, 'cleaner/2/estimator.html'),
        cleaner2_about: resolve(__dirname, 'cleaner/2/about.html'),
        cleaner2_contact: resolve(__dirname, 'cleaner/2/contact.html'),
      },
    },
  },
});
