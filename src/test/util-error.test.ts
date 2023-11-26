import { StringUtils, getStringInfo, toUpper } from "../app/util";

describe.only("String Util test suite", () => {
  let sut: StringUtils;

  beforeEach(() => {
    sut = new StringUtils();
  });

  it("Should throw error for invalid arg - func wrap", () => {
    function expectErr() {
      const actual = sut.toUpper("");
    }
    expect(expectErr).toThrow();
    expect(expectErr).toThrowError("Invalid argument!");
  });

  it.only("Should throw error for invalid arg - try catch", (done) => {
    try {
      // if no error, wont hit catch block
      const actual = sut.toUpper("xx");
      done("manually fail");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty("message", "Invalid argument!x");
      done();
    }
  });
});
