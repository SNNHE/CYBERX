const path = require('path');
// const webpack = require('webpack');
const  HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin'); 

module.exports = {
  entry: {
    index: './js/index.js',
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].mins.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "css/index.css")
        ],
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
        ],
      }, 
      {
        test: /\.(png)/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 0,
              outputPath: 'images',
              publicPath: '/images',
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },

  optimization: {
    minimizer: [

      // 表示放优化的插件
      new TerserWebpackPlugin({
        parallel: true, // 开启多进程并行压缩
        cache: true, // 开启缓存 第一次bulid代码时用时Time: 3088ms, 第二次Time: 1178ms 第三次Time: 863ms
        terserOptions: {
          output: {
            comments: false,
          },
        },
        // extractComments: 'all',
      }),
      new OptimizeCssPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions:{
          // parser: safeParser,
          discardComments: {
            removeAll: true
          },
          // safe: true,
        },
        canPrint: true,
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      hash: true, // 为了避免缓存，可以在产出的资源后面添加hash值
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new MiniCssExtractPlugin({
      filename:'./css/[name].css',
    })
  ]
}