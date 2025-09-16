import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "/curriculum-browser/",
  build: {
    outDir: "dist",
    // Ensure proper MIME types
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks to reduce bundle size
          vendor: ["react", "react-dom"],
          reactflow: ["reactflow"],
          dnd: ["@dnd-kit/core", "@dnd-kit/react", "@dnd-kit/sortable"],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit
  },
  server: {
    headers: {
      // Ensure proper MIME types for JSX files
      "Content-Type": "application/javascript",
    },
  },
});
