import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          comments: false, // Отключение комментариев в разметке
        },
      },
    }),
  ],
  css: {
    modules: true, // Включение поддержки модульных стилей
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/assets/scss/_smart-grid.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
