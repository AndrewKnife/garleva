import { Ref, ref, UnwrapRef } from 'vue';

interface UseOpenable {
  isOpen: Ref<UnwrapRef<boolean>>;
  hasBeenOpened: Ref<boolean>;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useOpenable = (initialState = false): UseOpenable => {
  const isOpen = ref(initialState);
  const hasBeenOpened = ref(false);
  const setHasBeenOpened = () => {
    hasBeenOpened.value = true;
  };
  const open = () => {
    setHasBeenOpened();
    isOpen.value = true;
  };
  const close = () => {
    isOpen.value = false;
  };
  const toggle = () => {
    if (!isOpen.value) {
      setHasBeenOpened();
    }
    isOpen.value = !isOpen.value;
  };
  return { isOpen, hasBeenOpened, open, close, toggle };
};
