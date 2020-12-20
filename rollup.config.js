import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser"; // 81KB before, 29KB after

export default {
  input: './js/modules.js',
  output: {
    file: './js/bundle.js',
    format: 'iife',
    strict: false
  },
  plugins: [
    resolve({
      browser: true
    }),
    babel({
      exclude: "node_modules/**" // only transpile our source code
    }),
    commonjs({
      sourceMap: 'inline'
    }),
    terser()
  ],
}