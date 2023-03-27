<script setup>
  import { storeToRefs } from 'pinia';
  import { useModalStore } from '@/stores/modal.store';

  const modalStore = useModalStore();
  const { hiddenClass, isOpen, isActiveItem } = storeToRefs(modalStore);
</script>

<template>
  <div class="modal" id="modal" :class="hiddenClass">
    <div class="modal__infinity-close" @click.stop="isOpen = false"></div>
    <div class="modal__wrap">
      <BaseButton
        variant="default"
        class="modal__btn"
        type="button"
        @click="isOpen = false"
        >&#10008;</BaseButton
      >
      <ul class="modal__list">
        <li class="">
          <BaseButton
            variant="border"
            @click.prevent="isActiveItem = 'login'"
            :class="{
              'modal-active-item': isActiveItem === 'login',
            }"
            >Log in</BaseButton
          >
        </li>
        <li class="">
          <BaseButton
            variant="border"
            @click.prevent="isActiveItem = 'register'"
            :class="{
              'modal-active-item': isActiveItem === 'register',
            }"
            >Register</BaseButton
          >
        </li>
      </ul>

      <div class="modal__content">
        <LoginForm v-if="isActiveItem === 'login'" />
        <RegisterForm v-if="isActiveItem === 'register'" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 100vw;
    min-height: 100vh;
    background-color: rgb(31, 41, 55, 0.75);
    z-index: 110;
    &__wrap {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: rem(20);
      min-width: rem(300);
      background-color: white;
      border-radius: rem(10);
      padding: rem(40) rem(20);
    }
    &__infinity-close {
      position: fixed;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      z-index: -1;
    }
    &__btn {
      position: absolute;
      top: rem(5);
      right: rem(10);
      color: $accentColor;
      font-size: rem(24);
    }
    &__list {
      display: flex;
      justify-content: space-around;
    }
    &__content {
      max-height: calc(100vh - 200px);
      overflow-y: auto;
    }
  }

  .modal-close {
    visibility: hidden;
  }

  .modal-active-item {
    border: transparent solid rem(1);
    @extend %hover-focus-active-negative;
  }
</style>
