import { calculateComplexity } from "../../app/doubles/OtherUtils";

describe("OtherUtils test suite", () => {
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
});
