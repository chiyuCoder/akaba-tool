import {NumberUnitSpliter} from "../src/NumberUnitSpliter";

describe("NumberUnitSpliter.spec.ts", () => {
  const spliter = new NumberUnitSpliter([
    {
      unit: "万",
      splitNumber: 1_0000,
    },
    {
      unit: "亿",
      splitNumber: 1_0000_0000,
    },
  ]);
  const spliter2 = new NumberUnitSpliter([
    {
      unit: "万",
      splitNumber: 1_0000,
      compareNumber: 10_000,
    },
    {
      unit: "亿",
      splitNumber: 1_0000_0000,
      compareNumber: 10_0000_0000,
    },
  ]);
  it("should equal: sort", function () {
    const cloneList = spliter.cloneList();
    expect(cloneList[0].unit).toBe("亿");
  });
  it("should equal: first-match", function () {
    expect(spliter.getFirstMatchItem(2_0000)!.unit).toBe("万");
    expect(spliter.getFirstMatchItem(20000_0000)!.unit).toBe("亿");
    expect(spliter.getFirstMatchItem(2000)).toBe(null);
  });
  it("should equal: stringify", function () {
    expect(spliter.stringify(2_1000_1234)).toBe("2亿1000万1234");
    expect(spliter2.stringify(2_1000_1234.1)).toBe("21000万1234.1");
  });
  it("should equal: floatNum", function () {
    expect(spliter.floatNum(2_1000_1234)).toBe("2.1亿");
    expect(spliter.stringifyAsPreciseNum(2_1000_1234)).toBe("2.10亿");
  });
});
