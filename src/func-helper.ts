/**
 * @since 1.4.16
 * @param func 
 * @param parameters 
 * @returns 
 */
export function callFunc<R>(func: () => R): R 
export function callFunc<R, P extends Array<unknown>>(func: (...parameters: P) => R, parameters: P): R
export function callFunc<R, P extends Array<unknown>>(func: ((...parameters: P) => R) | (() => R), parameters?: P): R {
  if (Array.isArray(parameters)) {
    return func(...parameters);
  }
  return func();
}
