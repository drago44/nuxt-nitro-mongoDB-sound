<script setup>
  import { storeToRefs } from 'pinia';
  import { useMenuStore } from '@/stores/menu.store';

  const menuStore = useMenuStore();
  const { menuOpen } = storeToRefs(menuStore);
</script>

<template>
  <Body :class="{ 'menu-open': menuOpen }"></Body>
  <div>
    <Header />
    <slot />
    <Auth />
  </div>
</template>