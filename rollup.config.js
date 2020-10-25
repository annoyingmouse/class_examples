import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

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
    })
  ],
}