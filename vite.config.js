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
        plumber1_index: resolve(__dirname, 'plumber/1/index.html'),
        plumber1_services: resolve(__dirname, 'plumber/1/services.html'),
        plumber1_estimator: resolve(__dirname, 'plumber/1/estimator.html'),
        plumber1_emergency: resolve(__dirname, 'plumber/1/emergency.html'),
        plumber1_about: resolve(__dirname, 'plumber/1/about.html'),
        plumber1_contact: resolve(__dirname, 'plumber/1/contact.html'),
        plumber2_index: resolve(__dirname, 'plumber/2/index.html'),
        plumber2_services: resolve(__dirname, 'plumber/2/services.html'),
        plumber2_estimator: resolve(__dirname, 'plumber/2/estimator.html'),
        plumber2_emergency: resolve(__dirname, 'plumber/2/emergency.html'),
        plumber2_about: resolve(__dirname, 'plumber/2/about.html'),
        plumber2_contact: resolve(__dirname, 'plumber/2/contact.html'),
        electrician1_index: resolve(__dirname, 'electrician/1/index.html'),
        electrician1_services: resolve(__dirname, 'electrician/1/services.html'),
        electrician1_estimator: resolve(__dirname, 'electrician/1/estimator.html'),
        electrician1_emergency: resolve(__dirname, 'electrician/1/emergency.html'),
        electrician1_about: resolve(__dirname, 'electrician/1/about.html'),
        electrician1_contact: resolve(__dirname, 'electrician/1/contact.html'),
      },
    },
  },
});
