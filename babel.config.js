module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: "> 0.5%, ie >= 11"
        },
        modules: false,
        spec: true,
        useBuiltIns: "usage",
        forceAllTransforms: true,
        corejs: {
          version: 3,
          proposals: true
        }
      }
    ]
  ],
  plugins: [
    "@babel/plugin-proposal-private-methods",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-class-properties",
  ]
};