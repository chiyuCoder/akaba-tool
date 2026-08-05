
import { splitStringExceptEmpty } from "../../src";

describe("splitStringExceptEmpty", () => {
  it("null", () => {
    const resultList = splitStringExceptEmpty(null);
    expect(resultList.length).toBe(0);
  });
 
  it("undefined", () => {
    const resultList = splitStringExceptEmpty(undefined);
    expect(resultList.length).toBe(0);
  });

  it("", () => {
    const resultList = splitStringExceptEmpty("");
    expect(resultList.length).toBe(0);
  });
  it("NaN", () => {
    const resultList = splitStringExceptEmpty(NaN);
    expect(resultList.length).toBe(0);
  });
  it("0", () => {
    const resultList = splitStringExceptEmpty(0);
    expect(resultList.length).toBe(1);
    expect(resultList[0]).toBe("0");
  });
  it("0.25", () => {
    const resultList = splitStringExceptEmpty(0.25, ".");
    expect(resultList.length).toBe(2);
    expect(resultList[0]).toBe("0");
    expect(resultList[1]).toBe("25");
  });
  it("',str1,,str2,'", () => {
    const resultList = splitStringExceptEmpty(",str1,,str2,");
    expect(resultList.length).toBe(2);
    expect(resultList[0]).toBe("str1");
    expect(resultList[1]).toBe("str2");
  });
 
});
