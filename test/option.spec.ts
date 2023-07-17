import {copyOption, mixedOptAndCopyResult} from "../src";

describe("option.spec", function () {
  it("should not equal: mixedOptAndCopyResult", function () {
    const a = {
      a: {
        b: 5,
      },
    } as const;
    const b = {
      a: {
        a: "a",
        b: 6,
      },
    } as const;
    const c = mixedOptAndCopyResult(a, b);
    expect(c.a === a.a).toBe(false);
  });
  it("should not equal: copy", function () {
    const a: any = {
      a: {
        b: 5,
      },
    } as const;
    a["a1"] = a;
    const c = copyOption(a);
    expect(c.a1 === a).toBe(true);
  });
});
