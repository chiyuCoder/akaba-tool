/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @since 1.4.18
 * @param {*} value The value to check.
 * @returns {boolean} Returns true if `value` is an object(not array), else false.
 * @example
 *
 * getIsDictInfo({});
 * // => true
 *
 * getIsDictInfo([1, 2, 3]);
 * // => false
 *
 * getIsDictInfo(() => {});
 * // => false
 *
 * getIsDictInfo(null);
 * // => false
 */
export function getIsDictInfo(param: any): param is object {
  if (param === null || param === undefined) {
    return false;
  }
  if (typeof param !== "object") {
    return false;
  }
  if (Array.isArray(param)) {
    return false;
  }
  return true;
}

export function getStringKeyList<T extends object>(param: T): Array<Extract<keyof T, string>> {
  return Reflect.ownKeys(param)
    .filter((keyOne) => typeof keyOne === "string")
    .map((one) => one as Extract<keyof T, string>);
}

export function getObjHas<T extends object>(
  param: T, 
  keyName: string
): keyName is Extract<keyof T, string> {
  return Reflect.has(param, keyName);
}
