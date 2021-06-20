const webpack = require("webpack"),
  path = require("path"),
  root = path.resolve(__dirname, ".."),
  plugins = [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ];

module.exports = {
  context: path.resolve(root, "src"),
  entry: {
    magicph: "./magicph.js",
    magicinject: "./magicinject.js",
  },
  // devtool: IN_PRODUCTION_MODE ? 'source-map' : 'inline-source-map',
  // mode: IN_PRODUCTION_MODE ? 'production' : 'development',
  mode: "development",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "..", "dist/js"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js"],
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: true,
    splitChunks: false,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader", // creates style nodes from JS strings
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              importLoaders: 1,
            },
          },
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins,
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 500,
    ignored: /node_modules/,
  },
};
