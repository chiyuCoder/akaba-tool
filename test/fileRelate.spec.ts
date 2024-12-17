
import dataStr from "./chart-base64";
import {getDataFromBase64String, NSFileRelate} from "../src";

describe("fileRelate", () => {
    it("result", () => {
        const dataResult = getDataFromBase64String(dataStr) as NSFileRelate.IBase64RegResultMatch;
        expect(dataResult.isMatch).toBe(true);
        expect(dataResult.dataType).toBe("image");
        expect(dataResult.dataSuffix).toBe("png");
        expect(dataResult.mime).toBe("image/png");
        expect(dataResult.dataData).toBe(dataStr.slice(22));
    });

    it("base64", () => {
        const dataStr = "data:;base64,remain+text";
        const dataResult = getDataFromBase64String(dataStr) as NSFileRelate.IBase64RegResultMatch;
        expect(dataResult.isMatch).toBe(true);
        expect(dataResult.dataType).toBe("");
        expect(dataResult.dataSuffix).toBe("");
        expect(dataResult.mime).toBe("/");
        expect(dataResult.dataData).toBe("remain+text");
    });
    it("data only", () => {
        const dataStr = "data:,remain+text";
        const dataResult = getDataFromBase64String(dataStr) as NSFileRelate.IBase64RegResultMatch;
        expect(dataResult.isMatch).toBe(true);
        expect(dataResult.dataType).toBe("");
        expect(dataResult.dataSuffix).toBe("");
        expect(dataResult.mime).toBe("/");
        expect(dataResult.dataData).toBe("remain+text");
    });
});
