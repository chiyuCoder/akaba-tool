
/**
 * @since 1.4.0
 */
export function useSameTypeEvenNull<T>(
  obj: T | null | undefined,
  whenNull: any
): T {
  return obj ?? whenNull;
}

/**
 * @since 1.4.0
 */
export function usePartialTypeWhenNull<T>(
  obj: T | null | undefined,
  whenNull: any
): Partial<T> {
  return obj ?? whenNull;
}
