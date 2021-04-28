import "regenerator-runtime/runtime"; // needed for ``await`` support
import pattern from "./contentbrowser";
import utils from "@patternslib/patternslib/src/core/utils";

describe("pat-content-browser", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
    });

    it("is initialized correctly", async (done) => {
        document.body.innerHTML = `<div class="pat-content-browser" />`;

        const instance = pattern.init(
            document.querySelector(".pat-content-browser")
        );
        await utils.timeout(1);

        expect().toBe("");

        done();
    });
});
