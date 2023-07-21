const { resolve } = require("path");
const webpack = require("webpack");
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ESlintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  entry: {
    bundle: [
      "@babel/polyfill",
      `${__dirname}/app/main.js`,
      `${__dirname}/app/assets/scss/main.scss`
    ]
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "build"),
    publicPath: "/"
  },
  devServer: {
    port: 8081,
    allowedHosts: "all",
    historyApiFallback: {
      disableDotRole: true
    },
    open: true,
    hot: true,
    client: {
      logging: "error",
      progress: true,
      overlay: {
        errors: true,
        warnings: false
      }
    },
    static: {
      publicPath: "/",
      directory: resolve(__dirname, "build")
    },
    headers: {
      "X-Frame-Options": "sameorigin"
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "esbuild-loader",
          options: {
            loader: "tsx",
            target: "es2015"
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: {
          loader: "esbuild-loader",
          options: {
            loader: "tsx",
            target: "es2015"
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              additionalData: `@import "@app/assets/scss/_variables.scss";`
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/, /\.module.(s(a|c)ss)$/],
        include: [`${__dirname}`],
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData: `@import "@app/assets/scss/_variables.scss";`
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              mimeType: "image/png",
              name: "images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              mimeType: "application/octet-stream",
              name: "fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: "removeViewBox",
                    active: false
                  }
                ]
              }
            }
          },
          "url-loader"
        ]
      }
    ]
  },
  optimization: {
    moduleIds: "named"
  },

  resolve: {
    alias: {
      "@app": resolve(__dirname, "app/"),
      react: resolve(__dirname, "node_modules/react")
    },
    extensions: [".tsx", ".ts", ".js"]
  },

  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["bundle"],
      template: `${__dirname}/build/index.html`,
      filename: "index.html",
      inject: "body"
    }),
    new NodePolyfillPlugin(),
    new ReactRefreshWebpackPlugin(),
    new ESlintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
      lintDirtyModulesOnly: true,
      threads: true
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.js$/,
      options: {
        eslint: {
          configFile: resolve(__dirname, ".eslintrc"),
          caches: false,
          quite: true
        }
      }
    }),
    new ForkTsCheckerPlugin()
  ]
};
module.exports = config;
