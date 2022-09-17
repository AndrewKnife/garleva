import { computed, WritableComputedRef } from 'vue';

export const useModelWrapper = <T = number>(
  props: Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit: (emitName: any, value: T) => void,
  name = 'modelValue'
): WritableComputedRef<T> => {
  return computed({
    get: () => props[name] as T,
    set: (value) => emit(`update:${name}`, value),
  });
};
