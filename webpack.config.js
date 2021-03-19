const path = require("path");
const webpack_helpers = require("patternslib/webpack/webpack-helpers");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

module.exports = (env) => {
    return {
        entry: {
            bundle: "./bundle-config.js",
        },
        externals: [
            {
                window: "window",
            },
        ],
        output: {
            filename: "[name].js",
            chunkFilename: "chunks/[name].[contenthash].js",
            publicPath: "/dist",
            path: path.resolve(__dirname, "dist"),
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    include: /(\.min\.js$|bundle-vendors.js$)/,
                    extractComments: false,
                    terserOptions: {
                        output: {
                            comments: false,
                        },
                    },
                }),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules\/(?!(patternslib)\/).*/,
                    loader: "babel-loader",
                },
                {
                    test: /\.*(?:html|xml)$/i,
                    use: "raw-loader",
                },
                {
                    test: /\.(?:sass|scss|css)$/i,
                    use: [
                        {
                            loader: "style-loader",
                            options: {
                                insert: webpack_helpers.top_head_insert,
                            },
                        },
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: "file-loader",
                },
                {
                    test: /\.svg$/,
                    loader: "svg-inline-loader",
                },
                {
                    test: /\.svelte$/,
                    use: "svelte-loader",
                },
            ],
        },
        resolve: {
            alias: {
                svelte: path.resolve("node_modules", "svelte"),
            },
            extensions: [".wasm", ".mjs", ".js", ".json", ".svelte"],
            mainFields: ["svelte", "browser", "module", "main"],
        },
        devServer: {
            port: "8000",
            host: "0.0.0.0",
        },
        plugins: [
            new CleanWebpackPlugin(),
            new DuplicatePackageCheckerPlugin({
                verbose: true,
                emitError: true,
            }),
        ],
    };
};
