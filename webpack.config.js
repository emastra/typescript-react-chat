const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    return {
        entry: {
            main: resolve('./src/client/index.tsx'),
        },

        output: {
            path: resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".js", ".ts", ".tsx"]
        },

        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "ts-loader"
                        }
                    ]
                },
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    loader: "style-loader!css-loader!sass-loader"
                }
            ]
        },

        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        },

        devServer: {
            port: 8080,
            open: true,
            proxy: {
                '/': 'http://localhost:3000'
            }
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                favicon: './public/favicon.ico'
            }),
            // compile env variables
            new webpack.DefinePlugin({ 
                'process.env.SERVER_URL': JSON.stringify(env.SERVER_URL)
            })
        ]
    }
};