import { exec } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import banner from "vite-plugin-banner";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          // Copy manifest.json to dist/plugin
          {
            src: "./manifest.json",
            dest: "",
          },
          // Copy images/ to dist/plugin
          {
            src: "./images",
            dest: "",
          },
        ],
      }),
      // Add license information to banner after build
      banner({
        content: (fileName) => {
          if (fileName.endsWith(".js"))
            return fs.readFileSync(
              path.resolve(__dirname, "./dist/licenses.txt"),
              "utf-8"
            );
        },
      }),
      {
        // Pack to zip with `@kintone/plugin-packer` after build
        name: "zip-plugin",
        closeBundle: async () => {
          exec(
            process.env.INITIAL_PACK ? "npm run pack:init" : "npm run pack",
            (err, stdout) => {
              if (err) console.error(err);
              else console.log(stdout);
            }
          );
        },
      },
    ],
    build: {
      outDir: "./dist/plugin",
      rollupOptions: {
        input: "src/index.tsx",
        output: {
          entryFileNames: "js/index.js",
          assetFileNames: "css/[name].[ext]",
        },
      },
      minify: "terser",
    },
  };
});
