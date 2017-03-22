const path = require("path")
const copyWebpackPlugin = require("copy-webpack-plugin")

const entryDir = path.join(__dirname, "/src/entry")
const nodeModulesDir = path.join(__dirname, "node_modules")

const config = {
  watch: true,
  entry: {
    index: path.join(entryDir, "index.js")
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist/js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["es2015"]
        },
        exclude: [nodeModulesDir]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  plugins: [
    new copyWebpackPlugin([
      {from: "./src/imgs", to: "../imgs"},
      {from: "./src/template", to: "../html"},
      {from: "./src/css", to: "../css"}
    ])
  ],
  devServer: {
    contentBase: "./dist",
    port: 8089,
    colors: true
  }
}

module.exports = config
