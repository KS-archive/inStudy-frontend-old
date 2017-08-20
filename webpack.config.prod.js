const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        'sass-loader',
      ],
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      }),
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loaders: ['file-loader', 'image-webpack-loader'],
    }, {
      test: /\.(ttf|eot|woff|woff2)$/,
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]',
      },
    },
    ],
  },
  plugins: [

    // Include all scripts to html as diferent script tags.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),

    new ExtractTextPlugin('styles.css'),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),

    // Create visualization of javascript files used in project.
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),

  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};