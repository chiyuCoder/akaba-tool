import {camelCase} from "../src";

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
