
import { fixedVal, intVal, stringifyNumber } from "../src";

describe("num spec", () => {
    it("num.stringifyNumber", () => {
        expect(stringifyNumber(1e-9)).toBe("0.000000001");
    });
});

describe("int val", () => {
    it("num.intVal", () => {
        expect(intVal(1e-9, "")).toBe(0);
        expect(intVal("1e-9", "")).toBe(1);
        expect(intVal(1234567890.234e-9, "")).toBe(1);
    });
});
describe("fixed val", () => {
    it("num.fixedVal", () => {
        expect(fixedVal(1.204, 2, "")).toBe("1.20");
        expect(fixedVal(1.205, 2, "")).toBe("1.21");
        expect(fixedVal(-1.204, 2, "")).toBe("-1.20");
        expect(fixedVal(-1.205, 2, "")).toBe("-1.21");
        expect(fixedVal(-1.2, 2, "")).toBe("-1.20");
    });
});
