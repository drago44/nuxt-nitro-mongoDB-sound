<script setup>
  import { storeToRefs } from 'pinia';
  import { useModalStore } from '@/stores/modal.store';
  import { useAuthStore } from '@/stores/auth.store';

  const modalStore = useModalStore();
  const authStore = useAuthStore();

  const { toggleAuthModal } = modalStore;
  const { isActiveItem } = storeToRefs(modalStore);
  const { userLoggedIn } = storeToRefs(authStore);
  
  const menuOpen = ref(false);
</script>

<template>
  <header class="header">
    <div class="header__container">
      <NuxtLink to="/" class="header__logo">SOUND</NuxtLink>
      <nav class="header__menu menu">
        <ul class="menu__list" :class="{ 'menu-open': menuOpen }">
          <li class="menu__item">
            <NuxtLink to="/about" class="menu__link">About</NuxtLink>
          </li>
          <li class="menu__item" v-if="userLoggedIn">
            <NuxtLink to="/audio" class="menu__link">My Audio</NuxtLink>
          </li>
        </ul>
        <div class="menu__auth">
          <BaseButton
            variant="default"
            v-if="!userLoggedIn"
            @click.prevent="toggleAuthModal"
            ><span @click.prevent="isActiveItem = 'login'">Log in</span>
            /
            <span @click.prevent="isActiveItem = 'register'"
              >Register</span
            ></BaseButton
          >
          <BaseButton v-else variant="logout" @click="authStore.handleLogout()"
            ><span>Log out</span></BaseButton
          >
        </div>
        <BaseButton
          type="button"
          variant="menu"
          :class="{ 'menu-open': menuOpen }"
          @click.prevent="menuOpen = !menuOpen"
        >
          <span></span>
        </BaseButton>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
  .header {
    position: fixed;
    min-width: 100%;
    z-index: 100;
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    @include adaptiveValue('padding-top', 20, 10);
    @include adaptiveValue('padding-bottom', 20, 10);

    &__container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      @include adaptiveValue('column-gap', 60, 10);
    }

    &__logo {
      font-weight: 700;
      color: $accentColor;
      transition: transform 0.3s ease;
      @include adaptiveValue('font-size', 28, 24);

      &:hover,
      &:focus {
        transform: scale(0.9);
      }
    }

    &__menu {
      flex: 1 1 auto;
    }
  }

  .menu {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    @include adaptiveValue('column-gap', 60, 20);

    &__list {
      flex: 1 1 auto;
      display: flex;
      flex-wrap: wrap;
      gap: rem(15);

      @media (max-width: $mobile) {
        position: fixed;
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        opacity: 0;
        visibility: hidden;
        z-index: 2;

        &.menu-open {
          flex-wrap: nowrap;
          flex-direction: column;
          align-items: flex-end;
          width: 100vw;
          min-height: 100vh;
          top: rem(70);
          opacity: 1;
          overflow: auto;
          overflow-x: hidden;
          touch-action: auto;
          visibility: visible;
          padding: rem(50) rem(30);
        }
      }
    }

    &__item {
      @media (max-width: $mobile) {
        transform: translate(1000%, 0);
        transition: all 0.3s ease;

        &:nth-child(2) {
          transition: all 0.6s ease;
        }

        .menu-open & {
          transform: translate(0, 0);
        }
      }
    }

    &__link {
      position: relative;
      font-weight: 700;
      transition: all 0.3s ease 0s;

      @media (max-width: $mobile) {
        font-size: rem(30);
      }

      &::after {
        content: '';
        position: absolute;
        width: 110%;
        height: rem(2);
        bottom: rem(-5);
        left: -5%;
        background-color: $accentColor;
        transform: scaleX(0);
        transform-origin: bottom right;
        transition: transform 0.3s ease 0s;
      }

      &:focus,
      &:hover {
        &:after {
          transform-origin: bottom left;
          transform: scaleX(1);
        }
      }

      @extend %hover-focus-active;
    }

    &__auth {
      display: flex;
      align-items: center;
      span {
        font-weight: 700;
        @extend %hover-focus-active;
      }
    }
  }

  .router-link-exact-active {
    color: $accentColor;
  }
</style>
