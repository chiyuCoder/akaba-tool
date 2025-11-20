/**
 * @since 1.4.4
 */
export type PartialButRequired<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/**
 * @since 1.4.13
 */
export type StringKeyOf<T> = Extract<keyof T, string>;
/**
 * @since 1.4.13
 */
export type StrToNum<T extends string> = T extends `${infer N extends number}` ? N : never;

/**
 * @since 1.4.0
 */
export function useSameTypeEvenNull<T>(
  obj: T | null | undefined,
  whenNull: T
): T {
  return obj ?? whenNull;
}

/**
 * @since 1.4.0
 */
export function usePartialTypeWhenNull<T>(
  obj: T | null | undefined,
  whenNull: Partial<T>
): Partial<T> {
  return obj ?? whenNull;
}

/**
 * @description 请注意该方法修改传入的对象
 * @since 1.4.1
 */
export function dangerDeleteFromObjByKeyName<T extends object, K extends keyof T>(
  obj: T,
  keyName: K
): Omit<T, K> {
  const copyObj = obj as any;
  delete copyObj[keyName];
  return copyObj;
}

/**
 * @description 请注意该方法修改传入的对象
 * @since 1.4.1
 */
export function dangerBindKeyValueAt<
  T extends Record<string, any>,
  K extends string,
  V extends (T & Record<K, V>)[K]
>(
  obj: T,
  keyName: K,
  value: V
): T & Record<K, V> {
  const output: T & Record<K, V> = obj as any;
  output[keyName] = value;
  return output;
}

export function ensureNonNull<T>(obj: T | null | undefined): T {
  return obj as any;
}

/**
 * @since 1.4.13
 * @param obj 
 * @returns 
 */
export function getStringKeyListFrom<T extends object>(obj: T): Array<StringKeyOf<T>> {
  return Reflect.ownKeys(obj).filter((keyName) => typeof keyName === "string") as Array<any>;
}

/**
 * @since 1.4.14
 * @param obj 
 * @returns 
 */
export function useAsType<T>(obj: T): T {
  return obj;
}
