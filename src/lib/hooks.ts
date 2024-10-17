import { useDebouncedValue as _useDebouncedValue } from "@mantine/hooks";

export function useDebouncedValue<T = any>(
  value: T,
  wait: number,
  options?: {
    leading: boolean;
  }
): readonly [T, () => void] {
  return _useDebouncedValue(value, wait, options);
}
