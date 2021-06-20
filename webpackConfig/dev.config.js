const path = require('path'),
webpack = require('webpack'),
root = path.resolve(__dirname, '..');

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  context: path.resolve(root, 'src'),
  entry: {
    'magicph': './magicph.js',
    'magicinject': './magicinject.js',
    'sync': './sync.js',
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist/js'),
    filename: "[name].js",
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    })
  ],
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 500,
    ignored: /node_modules/,
  }
};
