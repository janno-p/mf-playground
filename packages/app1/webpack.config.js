const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const { DefinePlugin } = require('webpack')

module.exports = () => {
    return {
        mode: 'development',
        cache: false,
        devtool: 'source-map',
        optimization: {
            minimize: false
        },
        target: 'web',
        entry: path.resolve(__dirname, './src/main.js'),
        output: {
            publicPath: 'auto'
        },
        resolve: {
            extensions: [
                '.vue',
                '.js',
                '.json'
            ],
            alias: {
                vue: '@vue/runtime-dom'
            }
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    use: 'vue-loader'
                },
                {
                    test: /\.png$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                }
            ]
        },
        plugins: [
            new DefinePlugin({
                __VUE_OPTIONS_API__: false,
                __VUE_PROD_DEVTOOLS__: false
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new ModuleFederationPlugin({
                name: 'app1',
                filename: 'remoteEntry.js',
                exposes: {}
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './index.html')
            }),
            new VueLoaderPlugin()
        ],
        devServer: {
            contentBase: path.join(__dirname),
            compress: true,
            port: 3002,
            hot: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
            }
        }
    }
}
