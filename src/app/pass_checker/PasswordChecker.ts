export enum PasswordErrors {
  SHORT = "Password is too short!",
  NO_UPPER_CASE = "Upper case letter required!",
  NO_LOWER_CASE = "Lower case letter required!",
  NO_NUM = "At least one number required!",
}

export interface CheckResult {
  valid: boolean;
  reasons: PasswordErrors[];
}

export class PasswordChecker {
  public checkPassword(pw: string): CheckResult {
    const reasons: PasswordErrors[] = [];
    this.checkLength(pw, reasons);
    this.checkForUpper(pw, reasons);
    this.checkForLower(pw, reasons);

    return {
      valid: reasons.length === 0,
      reasons,
    };
  }

  public checkAdminPassword(pw: string): CheckResult {
    const basicCheck = this.checkPassword(pw);
    this.checkForNum(pw, basicCheck.reasons);
    return {
      valid: basicCheck.reasons.length === 0,
      reasons: basicCheck.reasons,
    };
  }

  private checkLength(pw: string, reasons: PasswordErrors[]) {
    if (pw.length < 8) {
      reasons.push(PasswordErrors.SHORT);
    }
  }

  private checkForUpper(pw: string, reasons: PasswordErrors[]) {
    if (pw === pw.toUpperCase()) {
      reasons.push(PasswordErrors.NO_UPPER_CASE);
    }
  }

  private checkForLower(pw: string, reasons: PasswordErrors[]) {
    if (pw === pw.toLowerCase()) {
      reasons.push(PasswordErrors.NO_LOWER_CASE);
    }
  }

  private checkForNum(pw: string, reasons: PasswordErrors[]) {
    const hasNum = /\d/;
    if (!hasNum.test(pw)) {
      reasons.push(PasswordErrors.NO_NUM);
    }
  }
}
