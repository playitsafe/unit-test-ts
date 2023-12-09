import {
  PasswordChecker,
  PasswordErrors,
} from "../../app/pass_checker/PasswordChecker";

describe("PW checker suite", () => {
  let sut: PasswordChecker;
  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it("password < 8 chars should be invalid", () => {
    const actual = sut.checkPassword("111");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.SHORT);
  });

  it("password > 8 chars should be ok", () => {
    const actual = sut.checkPassword("123456789");
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
  });

  it("complex password is valid", () => {
    const actual = sut.checkPassword("123456abcD");
    expect(actual.reasons).toHaveLength(0);
    expect(actual.valid).toBe(true);
  });
});
