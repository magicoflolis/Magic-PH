/* eslint-env node */
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
// const ExtensionReloader  = require('webpack-extension-reloader');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const file = (dir) => path.resolve(path.resolve(__dirname, '..'), dir);
const globOptions = {
    dot: true,
    gitignore: true,
    ignore: ['**/*.txt'],
  };

module.exports = (env, args) => {
  let brws = env.brws,
    plugins = [
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
      new CopyPlugin({
        patterns: [
          {
            from: file(`src/manifest/${brws}.json`),
            to: file(`tests/${brws}/manifest.json`),
            transform(content) {
              const {
                version,
                author,
                homepage: homepage_url,
              } = require('../package.json');
              const manifest = JSON.parse(content);
              return JSON.stringify(
                Object.assign(manifest, {
                  version,
                  author,
                  homepage_url,
                }),
                null,
                ' '
              );
            },
          },
          {
            from: file('src/_locales'),
            to: file(`tests/${brws}/_locales`),
            globOptions,
          },
          {
            from: file('src/html'),
            to: file(`tests/${brws}/[name][ext]`),
            globOptions,
          },
          // {
          //   from: file('tests/compiled'),
          //   to: file(`tests/${brws}/css/[name][ext]`)
          // },
          {
            from: file('src/img'),
            to: file(`tests/${brws}/img`),
            globOptions,
          },
          {
            from: file('src/web_accessible_resources'),
            to: file(`tests/${brws}/web_accessible_resources`),
            // force: true,
          },
          {
            from: file('src/js'),
            to: file(`tests/${brws}/js/[name][ext]`),
            globOptions,
            // force: true,
          },
        ],
      }),
    ],
    commonConfig = {
      context: file('src'),
      entry: {
        start: './js/start.js',
        'custom-player': './js/custom-player.js',
      },
      output: {
        path: file(`tests/${brws}/js`),
        filename: '[name].js',
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'swc-loader',
              options: {
                sync: true,
                jsc: {
                  parser: {
                    syntax: 'ecmascript',
                  },
                  target: 'es2020',
                },
                module: {
                  type: 'es6',
                },
              },
            },
          },
        ],
      },
      resolve: {
        extensions: ['.js'],
        fallback: {
          path: require.resolve('path-browserify'),
        },
      },
      plugins,
      // experiments: { topLevelAwait: true },
    },
    productionConfig = {
      mode: 'production',
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              format: {
                comments: false,
              },
            },
            extractComments: false,
            parallel: true,
          }),
        ],
      },
    },
    developmentConfig = {
      mode: 'development',
      devtool: 'source-map',
      // plugins: [
      //   new ExtensionReloader()
      // ],
      optimization: {
        minimize: false,
        minimizer: [
          new TerserPlugin({
            // test: /\.m?js$/,
            // minify: TerserPlugin.swcMinify,
            terserOptions: {
              format: {
                comments: true,
              },
            },
            extractComments: true,
            parallel: true,
          }),
        ],
      },
      watch: true,
      watchOptions: {
        poll: 1000,
        aggregateTimeout: 500,
        ignored: /(node_modules|bower_components)/,
      },
    };
  switch (args.mode) {
    case 'development':
      return merge(commonConfig, developmentConfig);
    case 'production':
      return merge(commonConfig, productionConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
};
