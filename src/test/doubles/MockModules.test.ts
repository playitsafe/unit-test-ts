jest.mock("../../app/doubles/OtherUtils", () => ({
  ...jest.requireActual("../../app/doubles/OtherUtils"),
  calculateComplexity: () => 10,
}));

import * as OtherUtils from "../../app/doubles/OtherUtils";

describe("module tests", () => {
  test("calc complexity", () => {
    const res = OtherUtils.calculateComplexity({} as any);
    console.log(">>>", res);
    expect(res).toBe(10);
  });

  test("to upper case", () => {
    const res = OtherUtils.toUpperCase("aaa");
    expect(res).toBe("AAA");
  });
});
