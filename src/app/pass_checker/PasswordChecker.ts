export enum PasswordErrors {
  SHORT = "Password is too short!",
  NO_UPPER_CASE = "Upper case letter required!",
  NO_LOWER_CASE = "Lower case letter required!",
  NO_NUMBER = "At least one number required!",
}

export interface CheckResult {
  valid: boolean;
  reasons: PasswordErrors[];
}

export class PasswordChecker {
  public checkPassword(pw: string): CheckResult {
    const reasons: PasswordErrors[] = [];
    if (pw.length < 8) {
      reasons.push(PasswordErrors.SHORT);
    }
    if (pw === pw.toLowerCase()) {
      reasons.push(PasswordErrors.NO_LOWER_CASE);
    }

    if (pw === pw.toUpperCase()) {
      reasons.push(PasswordErrors.NO_UPPER_CASE);
    }

    return {
      valid: reasons.length === 0,
      reasons,
    };
  }
}
