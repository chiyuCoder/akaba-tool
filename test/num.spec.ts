
import {intVal, stringifyNumber} from "../src";

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
