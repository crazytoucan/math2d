import ts from "@wessberg/rollup-plugin-ts";

export default {
  input: "src/index.ts",
  output: {
    file: "esm/index.js",
    format: "es",
  },
  plugins: [
    ts({
      tsconfig: "tsconfig.esm.json",
    }),
  ],
};
