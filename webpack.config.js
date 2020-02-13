const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const assetsPath = (_path) => path.posix.join('assets', _path)

const filename = (ext) => (isDev ? `[name].${ext}` : `[hash].[name].${ext}`)

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  }

  if (!isDev) {
    config.minimizer = [new OptimizeCssAssetsWebpackPlugin(), new TerserWebpackPlugin()]
  }
}

const cssLoader = (...args) => {
  const loader = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
      },
    },
    'css-loader',
  ]
  return [...loader, ...args]
}

const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      template: '../index.html',
      minify: {
        removeComments: !isDev,
        collapseWhitespace: !isDev,
        removeAttributeQuotes: !isDev,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: assetsPath(`css/${filename('css')}`),
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static'),
        to: 'assets',
        ignore: ['.*'],
      },
      {
        from: path.resolve(__dirname, 'src/mocks'),
        to: 'assets/mocks'
      }
    ]),
  ]

  if (!isDev) base.push(new BundleAnalyzerPlugin())

  return base
}

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ['@babel/polyfill', './main.ts'],
  },
  output: {
    filename: assetsPath(`js/${filename('js')}`),
    chunkFilename: assetsPath(`js/${filename('js')}`),
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 9000,
    hot: isDev,
  },
  devtool: isDev ? 'source-map' : '',
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@models': path.resolve(__dirname, 'src/models'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
  optimization: optimization(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoader(),
      },
      {
        test: /\.(scss|sass)$/,
        use: cssLoader('sass-loader'),
      },
      {
        test: /\.postcss$/,
        loader: 'postcss-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: '/node_modules/',
        use: ['babel-loader', 'tslint-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: assetsPath('images/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  plugins: plugins(),
}
