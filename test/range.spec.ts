import { getSplitInfoOf } from "../src/range";

describe("range:", () => {
  it("a", () => {
    const axisRange = getSplitInfoOf({
      min: 0,
      max: 924.61,
      splitNumber: 4,
    });
    expect(axisRange.step).toBe(231.1525);
  });
});
