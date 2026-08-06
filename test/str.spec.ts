import {camelCase, strVal, displayVal} from "../src";

describe("str", () => {
  it("camelCase:1", () => {
    const str = "--foo-bar--";
    const expectStr = "-FooBar--";
    expect(camelCase(str)).toBe(expectStr);
  });
  it("camelCase:2", () => {
    const str = "foo-bar--";
    const expectStr = "fooBar--";
    expect(camelCase(str)).toBe(expectStr);
  });
  it("camelCase:3", () => {
    const str = "foo@bar--";
    const expectStr = "foo@Bar--";
    expect(camelCase(str)).toBe(expectStr);
  });
  it("kebabCase:3", () => {
    const str = "foo@bar--";
    const expectStr = "foo@Bar--";
    expect(camelCase(str)).toBe(expectStr);
  });
});

describe("strVal", () => {
  it("''", () => {
    expect(strVal("")).toBe("");
  });
  it("null", () => {
    expect(strVal(null)).toBe("");
  });
  it("undefined", () => {
    expect(strVal(undefined)).toBe("");
  });
  it("NaN", () => {
    expect(strVal(NaN)).toBe("");
  });
  it("Infinity", () => {
    expect(strVal(Infinity)).toBe("");
  });
  it("'NaN'", () => {
    expect(strVal("NaN")).toBe("NaN");
  });
  it("1e2", () => {
    expect(strVal(1e2)).toBe("100");
  });
  it("100.20", () => {
    expect(strVal(100.20)).toBe("100.2");
  });
  it("'100.20'", () => {
    expect(strVal("100.20")).toBe("100.20");
  });
});

describe("displayVal", () => {
  it("''", () => {
    expect(displayVal("")).toBe("-");
  });
  it("null", () => {
    expect(displayVal(null)).toBe("-");
  });
  it("undefined", () => {
    expect(displayVal(undefined)).toBe("-");
  });
  it("NaN", () => {
    expect(displayVal(NaN)).toBe("-");
  });
  it("'NaN'", () => {
    expect(displayVal("NaN")).toBe("NaN");
  });
  it("1e2", () => {
    expect(displayVal(1e2)).toBe("100");
  });
  it("100.20", () => {
    expect(displayVal(100.20)).toBe("100.2");
  });
  it("'100.20'", () => {
    expect(displayVal("100.20")).toBe("100.20");
  });
});
