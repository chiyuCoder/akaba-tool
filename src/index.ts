export * from "./num";
export * from "./NumTransferTool";
export * from "./option";
export * from "./BaseCopier";
export * from "./OptionCopier";
export * from "./arrayLike";
export * from "./range";
export * from "./normalTool";
export * from "./fileRelate";
export * from "./PrivateMap";
export * from "./str";
export * from "./NumberUnitSpliter";
/**
 * @since 1.3.5
 */
export * from "./specialNumberChar";

/**
 * @since 1.3.6
 * @param val
 * @param compareVal
 */
export function isValueEqual(val: any, compareVal: any): boolean {
  // eslint-disable-next-line eqeqeq
  return val == compareVal;
}
/**
 * @since 1.3.6
 */
export function isStrictEqual(val: any, compareVal: any): boolean {
  return val === compareVal;
}
