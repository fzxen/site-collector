import ts from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";
import pkg from "./package.json";
import nodeResolve from "@rollup/plugin-node-resolve";

const extensions = [".ts", ".js"];

function genCommonPlugins() {
  return [
    ts({ declaration: false }),
    babel({ babelHelpers: "bundled", extensions }),
    nodeResolve()
  ];
}

export default [
  // * NPM Bundle: exclude dependencies
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/site-collector.cjs.js",
        format: "cjs",
      },
      {
        file: "dist/site-collector.esm.js",
        format: "esm",
      },
    ],
    external: Object.keys(pkg.dependencies || {}),
    plugins: [...genCommonPlugins()],
  },

  // * Browser Bundle: include dependencies
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/site-collector.umd.min.js",
        name: "site-collector",
        format: "umd",
      },
    ],
    plugins: [...genCommonPlugins(), terser()],
  },

  // * for demo
  {
    input: "src/index.ts",
    output: [
      {
        file: "demo/site-collector.esm.js",
        name: "site-collector",
        format: "esm",
      },
    ],
    plugins: [...genCommonPlugins()],
  },

  // * dts
  {
    input: "./src/index.ts",
    plugins: [dts()],
    output: {
      file: "dist/index.d.ts",
      format: "esm",
    },
  },
];
