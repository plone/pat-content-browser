module.exports = {
    rootDir: "./src",
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest",
        "\\.svelte$": "svelte-jest",
    },
    moduleFileExtensions: ["js", "json", "svelte"],
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    },
    testEnvironment: "jsdom",
    transformIgnorePatterns: [
        "/node_modules/(?!.*patternslib/*)(?!(svelte.*)/).+\\.[t|j]sx?$",
    ],
};
