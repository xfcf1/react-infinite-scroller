const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const rootPath = path.resolve(__dirname)

const config = {
  target: 'web',
  mode: 'development',
  entry: {
    index: path.join(rootPath, 'index.jsx')
  },
  output: {
    path: path.join(rootPath, 'js'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: require.resolve('babel-loader')
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: require.resolve('style-loader')
          },
          {
            loader: require.resolve('css-loader')
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      inject: true,
      template: path.join(rootPath, 'index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  ],
  devServer: {
    port: 8888,
    compress: true,
    historyApiFallback: true,
    hot: true
  }
}

module.exports = config
