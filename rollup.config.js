import ts from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import dts from "rollup-plugin-dts";
import pkg from "./package.json";

const extensions = [".ts", ".js"];

function genCommonPlugins() {
  return [
    ts({ declaration: false }),
    babel({ babelHelpers: "bundled", extensions }),
  ];
}

export default [
  // * NPM Bundle: 不包含依赖
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/site-collector.cjs.js",
        format: "cjs",
        globals: {
          "ua-parser-js": "UAParser",
          deepmerge: "merge",
        },
      },
      {
        file: "dist/site-collector.esm.js",
        format: "esm",
        globals: {
          "ua-parser-js": "UAParser",
          deepmerge: "merge",
        },
      },
    ],
    external: Object.keys(pkg.dependencies),
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
