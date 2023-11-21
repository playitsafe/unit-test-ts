import { toUpper } from "../app/util";

describe("Util test suite", () => {
  test("should do upper case", () => {
    const res = toUpper("abc");
    expect(res).toBe("ABC");
  });
});
