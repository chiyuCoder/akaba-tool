import {matchUnicodeWordsResult} from "./unicodeWords";
import {isSymbol} from "../symbol-relate/symbol-relate";
import {NSStringFunc} from "../declaration/ns-str";
import {mixedOpt} from "../option";
const INFINITY = 1 / 0;

const hasUnicodeWord = RegExp.prototype.test.bind(
  /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/
);
/** Used to match words composed of alphanumeric characters. */
// eslint-disable-next-line no-control-regex
const reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

function asciiWords(str: string): RegExpMatchArray | null {
  return str.match(reAsciiWord);
}
/**
 * Splits `string` into an array of its words.
 *
 * @since 1.1.0
 */
export function getWords(str: string = "", pattern?: RegExp): RegExpMatchArray | [] {
  if (pattern === undefined) {
    const result = hasUnicodeWord(str) ? matchUnicodeWordsResult(str) : asciiWords(str);
    return result || [];
  }
  return str.match(pattern) || [];
}

/**
 *
 * @since 1.1.0
 */
export function stringify(value: unknown): string {
  // eslint-disable-next-line eqeqeq
  if (value == null) {
    return "";
  }
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    // eslint-disable-next-line eqeqeq
    return `${value.map((other) => other == null ? other : stringify(other)).join(",")}`;
  }
  if (isSymbol(value)) {
    return (value as object).toString();
  }
  const result = `${value}`;
  // eslint-disable-next-line eqeqeq
  return (result == "0" && (1 / (value as number)) == -INFINITY) ? "-0" : result;
}

/**
 *
 * @since 1.1.0
 */
export function getTag(value: unknown): string {
  // eslint-disable-next-line eqeqeq
  if (value == null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  return Object.prototype.toString.call(value);
}

/**
 *
 * @since 1.1.0
 */
export function kebabCase(str: string, sep: string = "-"): string {
  return str.replace(/[A-Z]/g, (matchLetters: string, index: number) => {
    if (index === 0) {
      return matchLetters.toLowerCase();
    }
    return sep + matchLetters.toLowerCase();
  });
}

/**
 *
 * @since 1.1.0
 */
export function camelCase(str: string, params: Partial<NSStringFunc.IParamCamelCase> = {}) {
  const {reg, isUpperFirstLetter} = mixedOpt<NSStringFunc.IParamCamelCase, Partial<NSStringFunc.IParamCamelCase>>({
    isUpperFirstLetter: false,
    reg: /-?[a-z]+/g,
  }, params);
  return str.replace(reg, (matchLetters: string, index: number) => {
    if (index === 0 && !isUpperFirstLetter) {
      return matchLetters;
    }
    return upperFirstLetter(getWords(matchLetters)[0]!);
  });
}

/**
 *
 * @since 1.1.0
 */
export function upperFirstLetter(str: string): string {
  return str.replace(/[a-z]/, ($0) => $0.toUpperCase());
}
