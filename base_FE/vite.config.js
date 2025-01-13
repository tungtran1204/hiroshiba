import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "@rollup/plugin-commonjs"; // Import plugin commonjs

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    commonjs(), // Thêm plugin commonjs vào mảng plugins
  ],
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
