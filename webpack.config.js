process.traceDeprecation = true;
const path = require("path");
const patternslib_config = require("@patternslib/patternslib/webpack/webpack.config.js");
const svelte_config = require("./webpack.svelte");

module.exports = async (env, argv) => {
    let config = {
        entry: {
            bundle: path.resolve(__dirname, "bundle-config.js"),
        },
    };

    config = svelte_config(env, argv, patternslib_config(env, argv, config));
    config.output.path = path.resolve(__dirname, "dist/");

    if (process.env.NODE_ENV === "development") {
        config.devServer.static.directory = __dirname;
    }

    return config;
};
