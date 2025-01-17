import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "@rollup/plugin-commonjs"; // Import plugin commonjs
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    commonjs(), // Thêm plugin commonjs vào mảng plugins
  ],
  resolve: {
    alias: {
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@templates": path.resolve(__dirname, "./src/templates"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"), // Có thể thêm alias khác nếu cần
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
