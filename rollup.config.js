import ts from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";

const extensions = [".ts", ".js"];

function genCommonPlugins() {
  return [ts(), babel({ babelHelpers: "bundled", extensions })];
}

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/site-collector.esm.js",
      format: "esm",
      globals: {
        "ua-parser-js": "UAParser",
        deepmerge: "merge",
      },
    },
    external: ["ua-parser-js", "deepmerge"],
    plugins: [...genCommonPlugins()],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/site-collector.min.js",
      name: "site-collector",
      format: "umd",
      globals: {
        "ua-parser-js": "UAParser",
        deepmerge: "merge",
      },
    },
    external: ["ua-parser-js", "deepmerge"],
    plugins: [...genCommonPlugins(), terser()],
  },
];
