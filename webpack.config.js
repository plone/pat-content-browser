process.traceDeprecation = true;
const path = require("path");
const patternslib_config = require("@patternslib/patternslib/webpack/webpack.config.js");
const svelte_config = require("./webpack.svelte");

module.exports = async (env, argv) => {
    const config = svelte_config(env, argv, patternslib_config(env, argv));

    config.entry = {
        bundle: path.resolve(__dirname, "bundle-config.js"),
    };
    config.output.path = path.resolve(__dirname, "dist/");

    return config;
};
