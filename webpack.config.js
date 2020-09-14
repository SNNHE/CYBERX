const path = require('path');
// const webpack = require('webpack');
const  HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin'); 
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: './js/index.js',
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].mins.js'
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
              limit:10*1024,
              name: '[name].[hash:7].[ext]',
              outputPath: 'images',
              publicPath: '../images',
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: [0.2, 0.8],
                // speed: 4
              },
              gifsicle: {
                enabled: false,
              },
              svgo: {
                enabled: false,
              },
              // the webp option will enable WEBP
              webp: {
                // quality: 75
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
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './locales/en', to: path.resolve(__dirname, 'dist/locales/en') },
        { from: './locales/zh', to: path.resolve(__dirname, 'dist/locales/zh') },
        { from: './images/earthloop.png', to: path.resolve(__dirname, 'dist/images') },
        { from: './images/outerloop.png', to: path.resolve(__dirname, 'dist/images') },
        { from: './images/partner.png', to: path.resolve(__dirname, 'dist/images') },
        { from: './css/swiper-3.4.2.min.css', to: path.resolve(__dirname, 'dist/css') },
        { from: './js', to: path.resolve(__dirname, 'dist/js') },
        { from: './ServiceWorker', to: path.resolve(__dirname, 'dist/ServiceWorker') },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      favicon: './images/favicon.ico',
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