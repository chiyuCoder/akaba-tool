/**
 * @description 返回[0-9]的数据下标
 * @since 1.3.5
 * @param index
 */
export function getSubscriptChar(index: number): string {
  return String.fromCharCode(8320 + index);
}

/**
 * 注意有些字体显示格式问题
 * @description 返回[0-9]的数据上标
 * @since 1.3.5
 * @param index
 */
export function getSuperscriptChar(index: number): string {
  const str = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  return str.charAt(index);
}
