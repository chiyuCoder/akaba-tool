
import { fixedVal, intVal, stringifyNumber, floatVal, floatNum, isNumberLike, isIntLike, isPositiveInt, isPositiveNumber, getMinIn, getMaxIn, toNumber, getNumInRange } from "../src";

describe("num spec", () => {
    it("num.stringifyNumber", () => {
        expect(stringifyNumber(1e-9)).toBe("0.000000001");
    });
});
describe("floatVal", () => {
    it("floatVal(Infinity,'-')", () => {
        expect(floatVal(Infinity, "-")).toBe(Infinity);
    });
    it("floatVal('Infinity','-')", () => {
        expect(floatVal("Infinity", "-")).toBe("-");
    });
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
    it("floatNum(Infinity,'-')", () => {
        expect(floatNum(Infinity, 2, "-")).toBe(Infinity);
    });
    it("floatNum('Infinity','-')", () => {
        expect(floatNum("Infinity", 2, "-")).toBe("-");
    });
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
    it("intVal(Infinity,'-')", () => {
        expect(intVal(Infinity, "-")).toBe("-");
    });
    it("intVal('Infinity','-')", () => {
        expect(intVal("Infinity", "-")).toBe("-");
    });
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

    
    it("fixedVal(Infinity,2, '-')", () => {
        expect(fixedVal(Infinity, 2,"-")).toBe("-");
    });
    it("fixedVal('Infinity',2, '-')", () => {
        expect(fixedVal("Infinity", 2,"-")).toBe("-");
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
    it("isNumberLike('null')", () => {
        expect(isNumberLike("null")).toBe(false);
    });
    it("isNumberLike(undefined)", () => {
        expect(isNumberLike(undefined)).toBe(false);
    });
    it("isNumberLike('undefined')", () => {
        expect(isNumberLike("undefined")).toBe(false);
    });
    it("isNumberLike(NaN)", () => {
        expect(isNumberLike(NaN)).toBe(false);
    });
    it("isNumberLike('NaN')", () => {
        expect(isNumberLike("NaN")).toBe(false);
    });
    it("isNumberLike(Infinity)", () => {
        expect(isNumberLike(Infinity)).toBe(false);
    });
    it("isNumberLike('Infinity')", () => {
        expect(isNumberLike("Infinity")).toBe(false);
    });
});

describe("isIntLike", () => {
    it("isIntLike(null)", () => {
        expect(isIntLike(null)).toBe(false);
    });
    it("isIntLike('null')", () => {
        expect(isIntLike("null")).toBe(false);
    });
    it("isIntLike(undefined)", () => {
        expect(isIntLike(undefined)).toBe(false);
    });
    it("isIntLike('undefined')", () => {
        expect(isIntLike("undefined")).toBe(false);
    });
    it("isIntLike(NaN)", () => {
        expect(isIntLike(NaN)).toBe(false);
    });
    it("isIntLike('NaN')", () => {
        expect(isIntLike("NaN")).toBe(false);
    });
    it("isIntLike(Infinity)", () => {
        expect(isIntLike(Infinity)).toBe(false);
    });
    it("isIntLike('Infinity')", () => {
        expect(isIntLike("Infinity")).toBe(false);
    });
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
});

describe("isPositiveInt", () => {
    it("isPositiveInt(null)", () => {
        expect(isPositiveInt(null)).toBe(false);
    });
    it("isPositiveInt('null')", () => {
        expect(isPositiveInt("null")).toBe(false);
    });
    it("isPositiveInt(undefined)", () => {
        expect(isPositiveInt(undefined)).toBe(false);
    });
    it("isPositiveInt('undefined')", () => {
        expect(isPositiveInt("undefined")).toBe(false);
    });
    it("isPositiveInt(NaN)", () => {
        expect(isPositiveInt(NaN)).toBe(false);
    });
    it("isPositiveInt('NaN')", () => {
        expect(isPositiveInt("NaN")).toBe(false);
    });
    it("isPositiveInt(Infinity)", () => {
        expect(isPositiveInt(Infinity)).toBe(false);
    });
    it("isPositiveInt('Infinity')", () => {
        expect(isPositiveInt("Infinity")).toBe(false);
    });
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
});
describe("isPositiveNumber", () => {
    it("isPositiveNumber(null)", () => {
        expect(isPositiveNumber(null)).toBe(false);
    });
    it("isPositiveNumber('null')", () => {
        expect(isPositiveNumber("null")).toBe(false);
    });
    it("isPositiveNumber(undefined)", () => {
        expect(isPositiveNumber(undefined)).toBe(false);
    });
    it("isPositiveNumber('undefined')", () => {
        expect(isPositiveNumber("undefined")).toBe(false);
    });
    it("isPositiveNumber(NaN)", () => {
        expect(isPositiveNumber(NaN)).toBe(false);
    });
    it("isPositiveNumber('NaN')", () => {
        expect(isPositiveNumber("NaN")).toBe(false);
    });
    it("isPositiveNumber(Infinity)", () => {
        expect(isPositiveNumber(Infinity)).toBe(false);
    });
    it("isPositiveNumber('Infinity')", () => {
        expect(isPositiveNumber("Infinity")).toBe(false);
    });
    it("isPositiveNumber(0)", () => {
        expect(isPositiveNumber(0)).toBe(true);
    });
    it("isPositiveNumber(+0)", () => {
        expect(isPositiveNumber(+0)).toBe(true);
    });
    it("isPositiveNumber(-0)", () => {
        expect(isPositiveNumber(-0)).toBe(true);
    });
    it("isPositiveNumber('0')", () => {
        expect(isPositiveNumber("0")).toBe(true);
    });
    it("isPositiveNumber('+0')", () => {
        expect(isPositiveNumber("+0")).toBe(true);
    });
    it("isPositiveNumber('-0')", () => {
        expect(isPositiveNumber("-0")).toBe(false);
    });
    it("isPositiveNumber(103)", () => {
        expect(isPositiveNumber(103)).toBe(true);
    });
    it("isPositiveNumber(103.00)", () => {
        expect(isPositiveNumber(103.00)).toBe(true);
    });
    it("isPositiveNumber('103.00')", () => {
        expect(isPositiveNumber("103.00")).toBe(true);
    });
    it("isPositiveNumber(103.01)", () => {
        expect(isPositiveNumber(103.01)).toBe(true);
    });
    it("isPositiveNumber(+103)", () => {
        expect(isPositiveNumber(+103)).toBe(true);
    });
    it("isPositiveNumber(-103)", () => {
        expect(isPositiveNumber(-103)).toBe(false);
    });
    it("isPositiveNumber('+103')", () => {
        expect(isPositiveNumber("+103")).toBe(true);
    });
    it("isPositiveNumber('-103')", () => {
        expect(isPositiveNumber("-103")).toBe(false);
    });
    it("isPositiveNumber(+1e3)", () => {
        expect(isPositiveNumber(+1e3)).toBe(true);
    });
    it("isPositiveNumber(-1e3)", () => {
        expect(isPositiveNumber(-1e3)).toBe(false);
    });
    it("isPositiveNumber(1e3)", () => {
        expect(isPositiveNumber(1e3)).toBe(true);
    });
    it("isPositiveNumber('1e3')", () => {
        expect(isPositiveNumber("1e3")).toBe(false);
    });
    it("isPositiveNumber('1e-3')", () => {
        expect(isPositiveNumber("1e-3")).toBe(false);
    });
    it("isPositiveNumber(1e-3)", () => {
        expect(isPositiveNumber(1e-3)).toBe(true);
    });
    it("isPositiveNumber(0.001)", () => {
        expect(isPositiveNumber(0.001)).toBe(true);
    });
    it("isPositiveNumber('0.001')", () => {
        expect(isPositiveNumber("0.001")).toBe(true);
    });
    it("isPositiveNumber('-0.001')", () => {
        expect(isPositiveNumber("-0.001")).toBe(false);
    });
    it("isPositiveNumber('+0.001')", () => {
        expect(isPositiveNumber("+0.001")).toBe(true);
    });
    it("isPositiveNumber('+.001')", () => {
        expect(isPositiveNumber("+.001")).toBe(false);
    });
    it("isPositiveNumber('.001')", () => {
        expect(isPositiveNumber(".001")).toBe(false);
    });
    it("isPositiveNumber(-0.001)", () => {
        expect(isPositiveNumber(-0.001)).toBe(false);
    });
    it("isPositiveNumber(+.001)", () => {
        expect(isPositiveNumber(+.001)).toBe(true);
    });
    it("isPositiveNumber('1e')", () => {
        expect(isPositiveNumber("1e")).toBe(false);
    });
    it("isPositiveNumber('1px')", () => {
        expect(isPositiveNumber("1px")).toBe(false);
    });
});


describe("getMinIn", () => {
    it("getMinIn('-10px', '2%', NaN, null, undefined, Infinity, 1, -5)", () => {
        const targetVal = getMinIn("-10px", "2%", NaN, null, undefined, 1, -5, Infinity);
        expect(targetVal).toBe(-10);
    });
});
describe("getMaxIn", () => {
    it("getMaxIn('-10px', '2%', NaN, null, undefined, 1, -5)", () => {
        const targetVal = getMaxIn("-10px", "2%", NaN, null, undefined, 1, -5);
        expect(targetVal).toBe(2);
    });
    it("getMaxIn('-10px', '2%', NaN, null, undefined, 1, -5, Infinity)", () => {
        const targetVal = getMaxIn("-10px", "2%", NaN, null, undefined, 1, -5, Infinity);
        expect(targetVal).toBe(Infinity);
    });
});
describe("toNumber", () => {
    it("toNumber(null)", () => {
        expect(toNumber(null)).toBe(NaN);
    });
    it("toNumber('null')", () => {
        expect(toNumber("null")).toBe(NaN);
    });
    it("toNumber(undefined)", () => {
        expect(toNumber(undefined)).toBe(NaN);
    });
    it("toNumber('undefined')", () => {
        expect(toNumber("undefined")).toBe(NaN);
    });
    it("toNumber(NaN)", () => {
        expect(toNumber(NaN)).toBe(NaN);
    });
    it("toNumber('NaN')", () => {
        expect(toNumber("NaN")).toBe(NaN);
    });
    it("toNumber(Infinity)", () => {
        expect(toNumber(Infinity)).toBe(Infinity);
    });
    it("toNumber('Infinity')", () => {
        expect(toNumber("Infinity")).toBe(Infinity);
    });
    it("toNumber(1e2)", () => {
        expect(toNumber(1e2)).toBe(100);
    });
    it("toNumber('1e2')", () => {
        expect(toNumber("1e2")).toBe(100);
    });
});

describe("getNumInRange", () => {
    it("1, 10, NaN", () => {
        expect(getNumInRange(1, 10, NaN)).toBe(10);
    });
    it("1, 10", () => {
        expect(getNumInRange(1, 10)).toBe(10);
    });
    it("{num: 1, min: 10}", () => {
        expect(getNumInRange({num: 1, min: 10})).toBe(10);
    });
    it("{num: 1, min: 10, max: NaN}", () => {
        expect(getNumInRange({num: 1, min: 10, max: NaN})).toBe(10);
    });
    it("1, NaN, 10", () => {
        expect(getNumInRange(1, NaN, 10)).toBe(1);
    });
    it("{num: 1, max: 10}", () => {
        expect(getNumInRange({num: 1, max: 10})).toBe(1);
    });
    it("-Number.MAX_VALUE, NaN, 10", () => {
        expect(getNumInRange(-Number.MAX_VALUE, NaN, 10)).toBe(-Number.MAX_VALUE);
    });
    it("Number.MAX_VALUE, 10, NaN", () => {
        expect(getNumInRange(Number.MAX_VALUE, 10, NaN)).toBe(Number.MAX_VALUE);
    });
    it("5, 5, 7", () => {
        expect(getNumInRange(5, 5, 7)).toBe(5);
    });
    it("7, 5, 7", () => {
        expect(getNumInRange(7, 5, 7)).toBe(7);
    });
    it("6,5, 7", () => {
        expect(getNumInRange(6, 5, 7)).toBe(6);
    });
    it("1,5, 7", () => {
        expect(getNumInRange(1, 5, 7)).toBe(5);
    });
    it("10,5, 7", () => {
        expect(getNumInRange(10, 5, 7)).toBe(7);
    });

    it("6,7, 5", () => {
        expect(getNumInRange(6, 7, 5)).toBe(7); // (因为6<7,所以返回7)
    });
    it("8,7, 5", () => {
        expect(getNumInRange(8, 7, 5)).toBe(5); // (因为8 > 5,所以返回5)
    });
});
