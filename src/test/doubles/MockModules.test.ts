jest.mock("../../app/doubles/OtherUtils");

import * as OtherUtils from "../../app/doubles/OtherUtils";

describe("module tests", () => {
  test("calc complexity", () => {
    const res = OtherUtils.calculateComplexity({} as any);
    console.log(">>>", res);
  });

  test("to upper case", () => {
    const res = OtherUtils.toUpperCase("aaa");
    expect(res).toBe("ABC");
  });
});
