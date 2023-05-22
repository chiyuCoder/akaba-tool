export {
  getWords,
  kebabCase,
  camelCase,
  upperFirstLetter,
  getTag,
  stringify,
  rejoinString,
} from "./str-relate/get-words";

/**
 * @since 1.3.3
 * @param str
 * @param whenNull
 */
export function toShowString(str: any, whenNull: string = ""): string {
  if (str == null) {
    return whenNull;
  }
  return str.toString();
}

/**
 * @since 1.3.3
 * @param str
 * @param whenEmpty
 */
export function toNotEmptyString(str: any, whenEmpty: string = "-"): string {
  return toShowString(str) || whenEmpty;
}
