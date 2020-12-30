import ts from "@wessberg/rollup-plugin-ts";

export default {
  input: "src/index.ts",
  output: {
    file: "commonjs/index.js",
    format: "commonjs",
  },
  plugins: [
    ts({
      tsconfig: "tsconfig.json",
    }),
  ],
};
