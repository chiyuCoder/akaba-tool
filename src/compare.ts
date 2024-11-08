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
 * @param val
 * @param compareVal
 */
export function isValueNotEqual(val: any, compareVal: any): boolean {
  // eslint-disable-next-line eqeqeq
  return val != compareVal;
}
/**
 * @since 1.3.6
 */
export function isStrictNotEqual(val: any, compareVal: any): boolean {
  return val !== compareVal;
}
/**
 * @since 1.3.6
 */
export function isBiggerThan(val: any, compareVal: any): boolean {
  return val > compareVal;
}

/**
 * @since 1.3.6
 */
export function isBiggerOrEqual(val: any, compareVal: any): boolean {
  return val >= compareVal;
}

/**
 * @since 1.3.6
 */
export function isLessThan(val: any, compareVal: any): boolean {
  return val < compareVal;
}

/**
 * @since 1.3.6
 */
export function isLessOrEqual(val: any, compareVal: any): boolean {
  return val <= compareVal;
}

/**
 * @since 1.4.3
 * @param val
 * @param compareVal
 * @param epsilon
 */
export function isNearEqual(val: any, compareVal: any, epsilon: number = Number.EPSILON): boolean {
  const diff = val - compareVal;
  return diff <= epsilon;
}
