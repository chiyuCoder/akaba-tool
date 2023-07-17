/**
 * @since 1.3.5
 * @param index
 */
export function getSubscriptChar(index: number): string {
  return String.fromCharCode(8320 + index);
}

/**
 * @since 1.3.5
 * @param index
 */
export function getSuperscriptChar(index: number): string {
  const str = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  return str.charAt(index);
}
