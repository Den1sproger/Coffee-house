const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')



module.exports = {
  entry: {
    home: path.resolve(__dirname, 'src/scripts/', 'home.js'),
    menu: path.resolve(__dirname, 'src/scripts/', 'menu.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
	  clean: true,
    assetModuleFilename: 'assets/img/[name][ext]'
	},
  module: {
    rules: [
	    {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
	    },
      {
        test: /\.(png|jpg|jpeg|ttf|ico)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.svg$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/svg/'
          }
        }]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'pages/home.html',
      template: path.resolve(__dirname, 'src/pages/', 'home.html'),
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      filename: 'pages/menu.html',
      template: path.resolve(__dirname, 'src/pages/', 'menu.html'),
      chunks: ['menu']
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['dist'],
        }
      }
    })
  ],
  devServer: {
    static: './dist',
    watchFiles: path.resolve(__dirname, 'src'),
    port: 9000
  }
}