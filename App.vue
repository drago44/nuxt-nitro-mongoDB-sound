<template>
  <div>
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
  .layout-enter-active,
  .layout-leave-active {
    transition: all 0.3s linear;
  }
  .layout-enter-from {
    opacity: 0;
  }
  .layout-leave-to {
    transition: all 0s lienar;
    opacity: 0;
  }
</style>
