const path = require("path");

module.exports = (env, argv, config) => {
    // Add Svelte support
    config.module.rules.push({
        test: /\.svelte$/,
        use: "svelte-loader",
    });
    config.resolve.alias.svelte = path.resolve("node_modules", "svelte");
    config.resolve.extensions = [".wasm", ".mjs", ".js", ".json", ".svelte"];
    config.resolve.mainFields = ["svelte", "browser", "module", "main"];

    return config;
};
