
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
