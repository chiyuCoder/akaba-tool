import { getSplitInfoOf, buildRangeList } from "../src/range";

describe("range:", () => {
  it("a", () => {
    const axisRange = getSplitInfoOf({
      min: 0,
      max: 924.61,
      splitNumber: 4,
    });
    expect(axisRange.step).toBe(231.1525);
  });

  it("buildRangeList:[0,10)", () => {
    const rangeLength = 10;
    const rangeList = buildRangeList(rangeLength);
    expect(rangeList.length).toBe(rangeLength);
    const isTarget = rangeList.every((item, index) => {
      return item === index;
    });
    expect(isTarget).toBe(true);
  });
  it("buildRangeList:[0,10, step=2)", () => {
    const rangeLength = 10;
    const rangeList = buildRangeList(rangeLength, {
      step: 2,
    });
    expect(rangeList.length).toBe(rangeLength / 2);
    const isTarget = rangeList.every((item, index) => {
      return item === index * 2;
    });
    expect(isTarget).toBe(true);
    const rangeList2 = buildRangeList(rangeLength, 0, 2);
    const rangeList3 = buildRangeList(0, rangeLength, 2);
    expect(rangeList2.every((item, index) => {
      return item === index * 2;
    })).toBe(true);
    expect(rangeList3.every((item, index) => {
      return item === index * 2;
    })).toBe(true);
  });
  it("buildRangeList:[0,-10, step=-2)", () => {
    const rangeLength = 10;
    const rangeList = buildRangeList(-rangeLength, {
      step: -2,
    });
    expect(rangeList.length).toBe(rangeLength / 2);
    const isTarget = rangeList.every((item, index) => {
      return item === index * 2 - rangeLength;
    });
    expect(isTarget).toBe(true);
  });
});
