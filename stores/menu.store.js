import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', () => {
  const menuOpen = ref(false);

  const toogleMenu = () => {
    menuOpen.value = !menuOpen.value;
  };
  return {
    menuOpen,
    toogleMenu,
  };
});
