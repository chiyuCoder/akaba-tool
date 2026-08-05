
import dataStr from "./chart-base64";
import {getDataFromBase64String, NSFileRelate, parsePath} from "../src";

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
    it("'data:image/png;fileName=b.png,c=8&d=9,type=base64,base64,remain+text'", () => {
        const dataStr = "data:image/png;fileName=b.png,c=8&d=9,type=base64,base64,remain+text";
        const dataResult = getDataFromBase64String(dataStr) as NSFileRelate.IBase64RegResultMatch;
        expect(dataResult.isMatch).toBe(true);
        expect(dataResult.dataType).toBe("image");
        expect(dataResult.dataSuffix).toBe("png");
        expect(dataResult.mime).toBe("image/png");
        expect(dataResult.dataData).toBe("remain+text");
        expect(dataResult.additionalInfo).toBe("fileName=b.png,c=8&d=9,type=base64,");
    });
});

describe("parsePath", () => {
    it("c:/a/b/c.png", () => {
        const result = parsePath("c:/a/b/c.png");
        expect(result.isMatch).toBe(true);
        expect(result.root).toBe("c:/");
        expect(result.dir).toBe("a/b/");
        expect(result.base).toBe("c.png");
        expect(result.name).toBe("c");
        expect(result.ext).toBe(".png");
    });
    it("/a/b/c.png", () => {
        const result = parsePath("/a/b/c.png");
        expect(result.isMatch).toBe(true);
        expect(result.root).toBe("/");
        expect(result.dir).toBe("a/b/");
        expect(result.base).toBe("c.png");
        expect(result.name).toBe("c");
        expect(result.ext).toBe(".png");
    });
    it("/a/b/c.png?foo=bar", () => {
        const result = parsePath("/a/b/c.png?foo=bar");
        expect(result.isMatch).toBe(true);
        expect(result.root).toBe("/");
        expect(result.dir).toBe("a/b/");
        expect(result.base).toBe("c.png?foo=bar");
        expect(result.name).toBe("c");
        expect(result.ext).toBe(".png?foo=bar");
    });
    it("../b/c", () => {
        const result = parsePath("../b/c");
        expect(result.isMatch).toBe(true);
        expect(result.root).toBe("");
        expect(result.dir).toBe("../b/");
        expect(result.base).toBe("c");
        expect(result.name).toBe("c");
        expect(result.ext).toBe("");
    });
    it("./b/c", () => {
        const result = parsePath("./b/c");
        expect(result.isMatch).toBe(true);
        expect(result.root).toBe("");
        expect(result.dir).toBe("./b/");
        expect(result.base).toBe("c");
        expect(result.name).toBe("c");
        expect(result.ext).toBe("");
    });
});
