import { StringUtils } from "../app/util";

describe("StringUtil class test", () => {
  let sut: StringUtils;

  // only relative to their describe block
  beforeEach(() => {
    // independent from each test
    sut = new StringUtils();
    console.log("set up");
  });

  afterEach(() => {
    // clear mocks
    console.log("tear down");
  });
  it("Should return correct upperCase", () => {
    const actual = sut.toUpper("abc");
    expect(actual).toBe("ABC");
    console.log("Actual test");
  });
});
