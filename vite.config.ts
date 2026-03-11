import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        tailwindcss(),
        react(),
        dts({
            insertTypesEntry: true,
            rollupTypes: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "AyUiLibrary",
            formats: ["es", "cjs"],
            fileName: (format) => `index.${format === "es" ? "es" : "cjs"}.js`,
        },
        rollupOptions: {
            external: ["react", "react-dom", "react/jsx-runtime", "d3"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                    "react/jsx-runtime": "jsxRuntime",
                    d3: "d3",
                },
            },
        },
        cssCodeSplit: false,
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: [resolve(__dirname, "src/tests/setup.ts")],
        css: true,
        passWithNoTests: true,
    },
});
