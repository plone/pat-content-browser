process.traceDeprecation = true;
const path = require("path");
const patternslib_config = require("@patternslib/patternslib/webpack/webpack.config.js");

module.exports = async (env, argv) => {
    const config = patternslib_config(env, argv);

    config.entry = {
        bundle: path.resolve(__dirname, "bundle-config.js"),
    };
    config.output.path = path.resolve(__dirname, "dist/");

    // Correct moment alias
    config.resolve.alias.moment = path.resolve(__dirname, "node_modules/moment"); // prettier-ignore

    // Add Svelte support
    config.module.rules.push({
        test: /\.svelte$/,
        use: "svelte-loader",
    });
    config.resolve.alias.svelte = path.resolve("node_modules", "svelte");
    config.resolve.extensions = [".wasm", ".mjs", ".js", ".json", ".svelte"];
    config.resolve.mainFields = ["svelte", "browser", "module", "main"];

    if (argv.mode === "production") {
        // Also create minified bundles along with the non-minified ones.
        config.entry["bundle.min"] = path.resolve(__dirname, "bundle-config.js"); // prettier-ignore
        config.output.chunkFilename = "chunks/[name].[contenthash].min.js";
    }

    return config;
};
