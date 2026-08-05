
import { fixedVal, intVal, stringifyNumber, floatVal, floatNum, isNumberLike, isIntLike, isPositiveInt, getMinIn, getMaxIn } from "../src";

describe("num spec", () => {
    it("num.stringifyNumber", () => {
        expect(stringifyNumber(1e-9)).toBe("0.000000001");
    });
});
describe("floatVal", () => {
    it("floatVal(null,'-')", () => {
        expect(floatVal(null, "-")).toBe("-");
    });
    it("floatVal(undefined,'-')", () => {
        expect(floatVal(undefined, "-")).toBe("-");
    });
    it("floatVal(NaN,'-')", () => {
        expect(floatVal(NaN, "-")).toBe("-");
    });
    it("floatVal(0,'-')", () => {
        expect(floatVal(0, "-")).toBe(0);
    });
    it("floatVal('0','-')", () => {
        expect(floatVal("0", "-")).toBe(0);
    });
    it("floatVal('0px','-')", () => {
        expect(floatVal("0px", "-")).toBe(0);
    });
    it("floatVal('1e-9','-')", () => {
        expect(floatVal("1e-9", "-")).toBe(1e-9);
    });
    it("floatVal(1e-9,'-')", () => {
        expect(floatVal(1e-9, "-")).toBe(1e-9);
    });
    it("floatVal('1e','-')", () => {
        expect(floatVal("1e", "-")).toBe(1);
    });
    it("floatVal('1.2300px','-')", () => {
        expect(floatVal("1.2300px", "-")).toBe(1.23);
    });
    it("floatVal('1.2300','-')", () => {
        expect(floatVal("1.2300", "-")).toBe(1.23);
    });
});
describe("floatNum", () => {
    it("floatNum(null,2, '-')", () => {
        expect(floatNum(null, 2,"-")).toBe("-");
    });
    it("floatNum(undefined,2, '-')", () => {
        expect(floatNum(undefined, 2, "-")).toBe("-");
    });
    it("floatNum(NaN,2, '-')", () => {
        expect(floatNum(NaN, 2, "-")).toBe("-");
    });
    it("floatNum(0,2, '-')", () => {
        expect(floatNum(0, 2, "-")).toBe(0);
    });
    it("floatNum('0',2, '-')", () => {
        expect(floatNum("0", 2, "-")).toBe(0);
    });
    it("floatNum('0px',2, '-')", () => {
        expect(floatNum("0px", 2, "-")).toBe(0);
    });
    it("floatNum('1e-9',2, '-')", () => {
        expect(floatNum("1e-9", 2, "-")).toBe(0);
    });
    it("floatNum(1e-9,2, '-')", () => {
        expect(floatNum(1e-9, 2, "-")).toBe(0);
    });
    it("floatNum('1e','-')", () => {
        expect(floatNum("1e", 2, "-")).toBe(1);
    });
    it("floatNum('1.2300px', 2, '-')", () => {
        expect(floatNum("1.2300px", 2, "-")).toBe(1.23);
    });
    it("floatNum('1.2300', 2, '-')", () => {
        expect(floatNum("1.2300", 2, "-")).toBe(1.23);
    });
    it("floatNum('1.2340', 2, '-')", () => {
        expect(floatNum("1.2340", 2, "-")).toBe(1.23);
    });
    it("floatNum('1.2350', 2, '-')", () => {
        expect(floatNum("1.2350", 2, "-")).toBe(1.24);
    });
});

describe("int val", () => {
   
    it("intVal(null,'-')", () => {
        expect(intVal(null, "-")).toBe("-");
    });
    it("floatVal(undefined,'-')", () => {
        expect(floatVal(undefined, "-")).toBe("-");
    });
    it("intVal(NaN,'-')", () => {
        expect(intVal(NaN, "-")).toBe("-");
    });
    it("intVal(0,'-')", () => {
        expect(intVal(0, "-")).toBe(0);
    });
    it("intVal('0','-')", () => {
        expect(intVal("0", "-")).toBe(0);
    });
    it("intVal('0px','-')", () => {
        expect(intVal("0px", "-")).toBe(0);
    });
    it("intVal('1e-9','-')", () => {
        expect(intVal("1e-9", "-")).toBe(1);
    });
    it("intVal(1e-9,'-')", () => {
        expect(intVal(1e-9, "-")).toBe(0);
    });
    it("intVal(1e-6,'-')", () => {
        expect(intVal(1e-5, "-")).toBe(0);
    });
    it("intVal('1e','-')", () => {
        expect(intVal("1e", "-")).toBe(1);
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

    
    it("fixedVal(null,2, '-')", () => {
        expect(fixedVal(null, 2,"-")).toBe("-");
    });
    it("fixedVal(undefined,2, '-')", () => {
        expect(fixedVal(undefined, 2, "-")).toBe("-");
    });
    it("fixedVal(NaN,2, '-')", () => {
        expect(fixedVal(NaN, 2, "-")).toBe("-");
    });
    it("fixedVal(0,2, '-')", () => {
        expect(fixedVal(0, 2, "-")).toBe("0.00");
    });
    it("fixedVal('0',2, '-')", () => {
        expect(fixedVal("0", 2, "-")).toBe("0.00");
    });
    it("fixedVal('0px',2, '-')", () => {
        expect(fixedVal("0px", 2, "-")).toBe("0.00");
    });
    it("fixedVal('1e-9',2, '-')", () => {
        expect(fixedVal("1e-9", 2, "-")).toBe("0.00");
    });
    it("fixedVal(1e-9,2, '-')", () => {
        expect(fixedVal(1e-9, 2, "-")).toBe("0.00");
    });
    it("fixedVal('1e','-')", () => {
        expect(fixedVal("1e", 2, "-")).toBe("1.00");
    });
    it("fixedVal('1.2300px', 2, '-')", () => {
        expect(fixedVal("1.2300px", 2, "-")).toBe("1.23");
    });
    it("fixedVal('1.2300', 2, '-')", () => {
        expect(fixedVal("1.2300", 2, "-")).toBe("1.23");
    });
    it("fixedVal('1.2340', 2, '-')", () => {
        expect(fixedVal("1.2340", 2, "-")).toBe("1.23");
    });
    it("fixedVal('1.2350', 2, '-')", () => {
        expect(fixedVal("1.2350", 2, "-")).toBe("1.24");
    });
});
describe("isNumberLike", () => {
    it("isNumberLike(103)", () => {
        expect(isNumberLike(103)).toBe(true);
    });
    it("isNumberLike(+103)", () => {
        expect(isNumberLike(+103)).toBe(true);
    });
    it("isNumberLike(-103)", () => {
        expect(isNumberLike(-103)).toBe(true);
    });
    it("isNumberLike('+103')", () => {
        expect(isNumberLike("+103")).toBe(true);
    });
    it("isNumberLike('-103')", () => {
        expect(isNumberLike("-103")).toBe(true);
    });
    it("isNumberLike(+1e3)", () => {
        expect(isNumberLike(+1e3)).toBe(true);
    });
    it("isNumberLike(-1e3)", () => {
        expect(isNumberLike(-1e3)).toBe(true);
    });
    it("isNumberLike(1e3)", () => {
        expect(isNumberLike(1e3)).toBe(true);
    });
    it("isNumberLike('1e3')", () => {
        expect(isNumberLike("1e3")).toBe(false);
    });
    it("isNumberLike('1e-3')", () => {
        expect(isNumberLike("1e-3")).toBe(false);
    });
    it("isNumberLike(1e-3)", () => {
        expect(isNumberLike(1e-3)).toBe(true);
    });
    it("isNumberLike(0.001)", () => {
        expect(isNumberLike(0.001)).toBe(true);
    });
    it("isNumberLike('0.001')", () => {
        expect(isNumberLike("0.001")).toBe(true);
    });
    it("isNumberLike('-0.001')", () => {
        expect(isNumberLike("-0.001")).toBe(true);
    });
    it("isNumberLike('+0.001')", () => {
        expect(isNumberLike("+0.001")).toBe(true);
    });
    it("isNumberLike('+.001')", () => {
        expect(isNumberLike("+.001")).toBe(true);
    });
    it("isNumberLike('.001')", () => {
        expect(isNumberLike(".001")).toBe(true);
    });
    it("isNumberLike(-0.001)", () => {
        expect(isNumberLike(-0.001)).toBe(true);
    });
    it("isNumberLike(+0.001)", () => {
        expect(isNumberLike(+0.001)).toBe(true);
    });
    it("isNumberLike('1e')", () => {
        expect(isNumberLike("1e")).toBe(false);
    });
    it("isNumberLike('1px')", () => {
        expect(isNumberLike("1px")).toBe(false);
    });
    it("isNumberLike(null)", () => {
        expect(isNumberLike(null)).toBe(false);
    });
    it("isNumberLike(undefined)", () => {
        expect(isNumberLike(undefined)).toBe(false);
    });
    it("isNumberLike(NaN)", () => {
        expect(isNumberLike(NaN)).toBe(false);
    });
});

describe("isIntLike", () => {
    it("isIntLike(103)", () => {
        expect(isIntLike(103)).toBe(true);
    });
    it("isIntLike(103.00)", () => {
        expect(isIntLike(103.00)).toBe(true);
    });
    it("isIntLike('103.00')", () => {
        expect(isIntLike("103.00")).toBe(false);
    });
    it("isIntLike(103.01)", () => {
        expect(isIntLike(103.01)).toBe(false);
    });
    it("isIntLike(+103)", () => {
        expect(isIntLike(+103)).toBe(true);
    });
    it("isIntLike(-103)", () => {
        expect(isIntLike(-103)).toBe(true);
    });
    it("isIntLike('+103')", () => {
        expect(isIntLike("+103")).toBe(true);
    });
    it("isIntLike('-103')", () => {
        expect(isIntLike("-103")).toBe(true);
    });
    it("isIntLike(+1e3)", () => {
        expect(isIntLike(+1e3)).toBe(true);
    });
    it("isIntLike(-1e3)", () => {
        expect(isIntLike(-1e3)).toBe(true);
    });
    it("isIntLike(1e3)", () => {
        expect(isIntLike(1e3)).toBe(true);
    });
    it("isIntLike('1e3')", () => {
        expect(isIntLike("1e3")).toBe(false);
    });
    it("isIntLike('1e-3')", () => {
        expect(isIntLike("1e-3")).toBe(false);
    });
    it("isIntLike(1e-3)", () => {
        expect(isIntLike(1e-3)).toBe(false);
    });
    it("isIntLike(0.001)", () => {
        expect(isIntLike(0.001)).toBe(false);
    });
    it("isIntLike('0.001')", () => {
        expect(isIntLike("0.001")).toBe(false);
    });
    it("isIntLike('-0.001')", () => {
        expect(isIntLike("-0.001")).toBe(false);
    });
    it("isIntLike('+0.001')", () => {
        expect(isIntLike("+0.001")).toBe(false);
    });
    it("isIntLike('+.001')", () => {
        expect(isIntLike("+.001")).toBe(false);
    });
    it("isIntLike('.001')", () => {
        expect(isIntLike(".001")).toBe(false);
    });
    it("isIntLike(-0.001)", () => {
        expect(isIntLike(-0.001)).toBe(false);
    });
    it("isIntLike(+0.001)", () => {
        expect(isIntLike(+0.001)).toBe(false);
    });
    it("isIntLike('1e')", () => {
        expect(isIntLike("1e")).toBe(false);
    });
    it("isIntLike('1px')", () => {
        expect(isIntLike("1px")).toBe(false);
    });
    it("isIntLike(null)", () => {
        expect(isIntLike(null)).toBe(false);
    });
    it("isIntLike(undefined)", () => {
        expect(isIntLike(undefined)).toBe(false);
    });
    it("isIntLike(NaN)", () => {
        expect(isIntLike(NaN)).toBe(false);
    });
});

describe("isPositiveInt", () => {
    it("isPositiveInt(0)", () => {
        expect(isPositiveInt(0)).toBe(true);
    });
    it("isPositiveInt(+0)", () => {
        expect(isPositiveInt(+0)).toBe(true);
    });
    it("isPositiveInt(-0)", () => {
        expect(isPositiveInt(-0)).toBe(true);
    });
    it("isPositiveInt('0')", () => {
        expect(isPositiveInt("0")).toBe(true);
    });
    it("isPositiveInt('+0')", () => {
        expect(isPositiveInt("+0")).toBe(true);
    });
    it("isPositiveInt('-0')", () => {
        expect(isPositiveInt("-0")).toBe(false);
    });
    it("isPositiveInt(103)", () => {
        expect(isPositiveInt(103)).toBe(true);
    });
    it("isPositiveInt(103.00)", () => {
        expect(isPositiveInt(103.00)).toBe(true);
    });
    it("isPositiveInt('103.00')", () => {
        expect(isPositiveInt("103.00")).toBe(false);
    });
    it("isPositiveInt(103.01)", () => {
        expect(isPositiveInt(103.01)).toBe(false);
    });
    it("isPositiveInt(+103)", () => {
        expect(isPositiveInt(+103)).toBe(true);
    });
    it("isPositiveInt(-103)", () => {
        expect(isPositiveInt(-103)).toBe(false);
    });
    it("isPositiveInt('+103')", () => {
        expect(isPositiveInt("+103")).toBe(true);
    });
    it("isPositiveInt('-103')", () => {
        expect(isPositiveInt("-103")).toBe(false);
    });
    it("isPositiveInt(+1e3)", () => {
        expect(isPositiveInt(+1e3)).toBe(true);
    });
    it("isPositiveInt(-1e3)", () => {
        expect(isPositiveInt(-1e3)).toBe(false);
    });
    it("isPositiveInt(1e3)", () => {
        expect(isPositiveInt(1e3)).toBe(true);
    });
    it("isPositiveInt('1e3')", () => {
        expect(isPositiveInt("1e3")).toBe(false);
    });
    it("isPositiveInt('1e-3')", () => {
        expect(isPositiveInt("1e-3")).toBe(false);
    });
    it("isPositiveInt(1e-3)", () => {
        expect(isPositiveInt(1e-3)).toBe(false);
    });
    it("isPositiveInt(0.001)", () => {
        expect(isPositiveInt(0.001)).toBe(false);
    });
    it("isPositiveInt('0.001')", () => {
        expect(isPositiveInt("0.001")).toBe(false);
    });
    it("isPositiveInt('-0.001')", () => {
        expect(isPositiveInt("-0.001")).toBe(false);
    });
    it("isPositiveInt('+0.001')", () => {
        expect(isPositiveInt("+0.001")).toBe(false);
    });
    it("isPositiveInt('+.001')", () => {
        expect(isPositiveInt("+.001")).toBe(false);
    });
    it("isPositiveInt('.001')", () => {
        expect(isPositiveInt(".001")).toBe(false);
    });
    it("isPositiveInt(-0.001)", () => {
        expect(isPositiveInt(-0.001)).toBe(false);
    });
    it("isPositiveInt(+0.001)", () => {
        expect(isPositiveInt(+0.001)).toBe(false);
    });
    it("isPositiveInt('1e')", () => {
        expect(isPositiveInt("1e")).toBe(false);
    });
    it("isPositiveInt('1px')", () => {
        expect(isPositiveInt("1px")).toBe(false);
    });
    it("isPositiveInt(null)", () => {
        expect(isPositiveInt(null)).toBe(false);
    });
    it("isPositiveInt(undefined)", () => {
        expect(isPositiveInt(undefined)).toBe(false);
    });
    it("isPositiveInt(NaN)", () => {
        expect(isPositiveInt(NaN)).toBe(false);
    });
});


describe("getMinIn", () => {
    it("getMinIn('-10px', '2%', NaN, null, undefined, 1, -5)", () => {
        const targetVal = getMinIn("-10px", "2%", NaN, null, undefined, 1, -5);
        expect(targetVal).toBe(-10);
    });
});
describe("getMaxIn", () => {
    it("getMaxIn('-10px', '2%', NaN, null, undefined, 1, -5)", () => {
        const targetVal = getMaxIn("-10px", "2%", NaN, null, undefined, 1, -5);
        expect(targetVal).toBe(2);
    });
});

