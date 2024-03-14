import {
  calculateComplexity,
  toUpperCaseWithCb,
} from "../../app/doubles/OtherUtils";

describe("OtherUtils test suite", () => {
  describe("Tracking cb with jest mocks", () => {
    const cbMock = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("calls cb for invalid arg - track calls", () => {
      const actual = toUpperCaseWithCb("", cbMock);
      expect(actual).toBeUndefined();
      expect(cbMock).toHaveBeenCalledWith("Invalid argument!");
      expect(cbMock).toHaveBeenCalledTimes(1);
    });
  });
  // Stubs - incomplete test obj
  it("Calcs complexity", () => {
    const someInfo = {
      length: 5,
      extraInfo: {
        f1: "info",
        f2: "some info",
      },
    };

    const actual = calculateComplexity(someInfo as any);
    expect(actual).toBe(10);
  });

  // Fakes
  it("ToUpperCaseWithCB - calls cb for invalid args", () => {
    const actual = toUpperCaseWithCb("", () => {});
    expect(actual).toBeUndefined();
  });
  it("ToUpperCaseWithCB - calls cb for valid args", () => {
    const actual = toUpperCaseWithCb("abc", () => {});
    expect(actual).toBe("ABC");
  });
});
