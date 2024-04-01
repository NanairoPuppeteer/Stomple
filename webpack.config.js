const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
    return ({
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        mode: 'development',

        devServer: {
            compress: true,
            allowedHosts: "all",
            static: false,
            client: {
                logging: "warn",
                overlay: {
                    errors: true,
                    warnings: false,
                },
                progress: true,
            },
            port: 8080, host: '0.0.0.0'
        },

        module: {
            rules: [
                {
                    test: /\.ts(x)?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: [
                '.tsx',
                '.ts',
                '.js'
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                hash: true,
                minify: false
            })
        ]
    });
}