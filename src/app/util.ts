export function toUpper(s: string) {
  return s.toUpperCase();
}

export class StringUtils {
  public toUpper(arg: string) {
    if (!arg) {
      throw new Error("Invalid argument!");
    }
    return toUpper(arg);
  }
}

export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

export function getStringInfo(arg: string): stringInfo {
  return {
    lowerCase: arg.toLowerCase(),
    upperCase: arg.toUpperCase(),
    characters: Array.from(arg),
    length: arg.length,
    extraInfo: {},
  };
}
