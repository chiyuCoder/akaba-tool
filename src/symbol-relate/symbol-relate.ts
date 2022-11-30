import {getTag} from "../str-relate/get-words";

export function isSymbol(value: unknown): boolean {
  const type = typeof value;
  // eslint-disable-next-line eqeqeq
  return type === "symbol" || (type === "object" && value != null && getTag(value) === "[object Symbol]");
}
