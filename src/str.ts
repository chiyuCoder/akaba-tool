export {
  getWords,
  kebabCase,
  camelCase,
  upperFirstLetter,
  getTag,
  stringify,
  rejoinString,
  splitStringExceptEmpty,
} from "./str-relate/get-words";

/**
 * strVal 的别名
 * - str 为 null/NaN/undefined/Infinity 情况下返回给定的 whenNull;
 * - str 为字符串时，直接返回；
 * - str 为数字时，调用toString；
 * - 其它情况下，如果有toString，则调用toString，如果没有则调用JSON.stringify
 * ```TypeScript
 * strVal("") === "" // true
 * strVal(null) === "" // true
 * strVal(undefined) === "" // true
 * strVal(NaN) === "" // true
 * strVal(Infinity) === "" // true
 * strVal('NaN') === "NaN" // true
 * strVal(1e2) === "100" // true
 * strVal(100.20) === "100.2" // true
 * strVal("100.20") === "100.20" // true
 * ```
 * @since 1.3.3
 * @param str
 * @param whenNull
 */
export function toShowString(str: any, whenNull: string = ""): string {
  return strVal(str, whenNull);
}

/**
 * - str 为 null/NaN/undefined/Infinity 情况下返回给定的 whenNull;
 * - str 为字符串时，直接返回；
 * - str 为数字时，调用toString；
 * - 其它情况下，如果有toString，则调用toString，如果没有则调用JSON.stringify
 * ```TypeScript
 * strVal("") === "" // true
 * strVal(null) === "" // true
 * strVal(undefined) === "" // true
 * strVal(NaN) === "" // true
 * strVal(Infinity) === "" // true
 * strVal('NaN') === "NaN" // true
 * strVal(1e2) === "100" // true
 * strVal(100.20) === "100.2" // true
 * strVal("100.20") === "100.20" // true
 * ```
 * @since 1.4.21
 * @param str 
 * @param whenNull 
 * @returns 
 */
export function strVal(str: any, whenNull: string = ""): string {
  // eslint-disable-next-line eqeqeq
  if (str == null) {
    return whenNull;
  }
  if (typeof str === "string") {
    return str;
  }
  if (typeof str === "number") {
    if (isNaN(str) || !isFinite(str)) {
      return whenNull;
    }
    return str.toString();
  }
  if ("toString" in str && typeof str.toString === "function") {
    return str.toString();
  }
  return JSON.stringify(str);
}

/**
 * displayVal 的别名
 * strVal(str) 返回空时，这个函数返回给定的 whenNull;其它情况下，返回strVal(str)的结果
 * ```TypeScript
 * displayVal("") === "-" // true
 * displayVal(null) === "-" // true
 * displayVal(undefined) === "" // true
 * displayVal(NaN) === "-" // true
 * displayVal(Infinity) === "-" // true
 * strVal('NaN') === "NaN" // true
 * strVal(1e2) === "100" // true
 * strVal(100.20) === "100.2" // true
 * strVal("100.20") === "100.20" // true
 * ```
 * @since 1.3.3
 * @param str
 * @param whenEmpty
 */
export function toNotEmptyString(str: any, whenEmpty: string = "-"): string {
  return displayVal(str, whenEmpty);
}

/**
 * strVal(str) 返回空时，这个函数返回给定的 whenNull;其它情况下，返回strVal(str)的结果
 * ```TypeScript
 * displayVal("") === "-" // true
 * displayVal(null) === "-" // true
 * displayVal(undefined) === "" // true
 * displayVal(NaN) === "-" // true
 * displayVal(Infinity) === "-" // true
 * strVal('NaN') === "NaN" // true
 * strVal(1e2) === "100" // true
 * strVal(100.20) === "100.2" // true
 * strVal("100.20") === "100.20" // true
 * ```
 * @since 1.4.21
 * ```TypeScript
 * ```
 * @param str 
 * @param whenNull 
 * @returns 
 */
export function displayVal(str: any, whenEmpty: string = "-"): string {
  return strVal(str) || whenEmpty;
}
