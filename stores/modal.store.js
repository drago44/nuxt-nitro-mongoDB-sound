import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false);
  const isActiveItem = ref('login');

  const hiddenClass = computed(() => {
    return !isOpen.value ? 'modal-close' : '';
  });

  const toggleAuthModal = () => {
    isOpen.value = !isOpen.value;
  };

  return {
    isOpen,
    isActiveItem,
    hiddenClass,
    toggleAuthModal,
  };
});
