import {
  OtherStringUtils,
  calculateComplexity,
  toUpperCaseWithCb,
} from "../../app/doubles/OtherUtils";

describe.skip("OtherUtils test suite", () => {
  describe.only("OtherStringUtil with Spies", () => {
    // system under test
    let sut: OtherStringUtils;
    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    test("Use a Spy to track calls", () => {
      // Spy works on class
      const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");
      sut.toUpperCase("aaa");
      expect(toUpperCaseSpy).toHaveBeenCalledWith("aaa");
    });

    test("Use a Spy to track calls to other module", () => {
      // Spy works on class
      const consoleLogSpy = jest.spyOn(console, "log");
      sut.logStr("abc");
      expect(consoleLogSpy).toHaveBeenCalledWith("abc");

      // Spy on a class
      const pushSpy = jest.spyOn(Array.prototype, "push");
    });

    test.only("Use a Spy to replace implementation of a method", () => {
      jest.spyOn(sut as any, "callExternalService").mockImplementation(() => {
        console.log("call mock implementation!");
      });
      (sut as any).callExternalService();
    });
  });

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
