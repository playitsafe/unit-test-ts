import { v4 } from "uuid";

type LoggerServiceCallBack = (arg: string) => void;
export type StringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

export function calculateComplexity(stringInfo: StringInfo) {
  return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
}

export function toUpperCaseWithCb(
  arg: string,
  callBack: LoggerServiceCallBack
) {
  if (!arg) {
    callBack("Invalid argument!");
    return;
  }
  callBack(`called function with ${arg}`);
  return arg.toUpperCase();
}

export class OtherStringUtils {
  private fnNotAvailableForSpy() {}
  private callExternalService() {
    console.log("callExternalService");
  }

  public toUpperCase(arg: string) {
    return arg.toUpperCase();
  }

  public logStr(arg: string) {
    console.log(arg);
  }
}

// For mock module
export function toUpperCase(arg: string) {
  return arg.toUpperCase();
}

export function toLowerCaseWithId(arg: string) {
  return arg.toLowerCase() + v4();
}
