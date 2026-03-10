/**
 * @since 1.4.15
 * @param func 
 * @param parameters 
 * @returns 
 */
export function callFunc<R, P extends Array<unknown>>(func: (...parameters: P) => R, parameters: P): R {
  return func(...parameters);
}
