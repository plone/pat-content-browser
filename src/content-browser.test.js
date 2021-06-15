import "regenerator-runtime/runtime"; // needed for ``await`` support
import pattern from "./content-browser";
import utils from "@patternslib/patternslib/src/core/utils";

describe("pat-content-browser", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
    });

    it("is initialized correctly", async () => {
        document.body.innerHTML = `<div class="pat-content-browser" />`;

        pattern.init(document.querySelector(".pat-content-browser"));
        await utils.timeout(1);

        expect(document.querySelector(".content-browser-selected-items")).toBeTruthy();
        expect(document.querySelector(".content-browser-wrapper")).toBeTruthy();
    });
});
