import Base from "@patternslib/patternslib/src/core/base";
import Parser from "@patternslib/patternslib/src/core/parser";

// This pattern
import MillerColumnsBrowser from "./app/MillerColumnsBrowser.svelte";

export const parser = new Parser("contentbrowser");
parser.addArgument("vocabulary-url", "http://localhost:8081/Plone/@@getVocabulary");
parser.addArgument("max-depth", "2");
parser.addArgument("base-path", "/Plone14");
parser.addArgument(
    "attributes",
    [
        "UID",
        "Title",
        "portal_type",
        "path",
        "getURL",
        "getIcon",
        "is_folderish",
        "review_state",
    ],
    [
        "UID",
        "Title",
        "portal_type",
        "path",
        "getURL",
        "getIcon",
        "is_folderish",
        "review_state",
    ],
    true
);

export default Base.extend({
    name: "content-browser",
    trigger: ".pat-content-browser",

    init() {
        console.log("init mcb");
        this.options = parser.parse(this.el, this.options);
        console.log("this.options: ", this.options);
        this.component_instance = new MillerColumnsBrowser({
            target: this.el,
            // hydrate: true,
            props: {
                maxDepth: this.options.maxDepth,
                basePath: this.options.basePath,
                attributes: this.options.attributes,
                vocabularyUrl: this.options.vocabularyUrl,
            },
        });
    },

    isSelectable(item) {
        if (item.selectable === false) {
            return false;
        }
        if (this.options.selectableTypes === null) {
            return true;
        } else {
            return this.options.selectableTypes.indexOf(item.portal_type) !== -1;
        }
    },
});
