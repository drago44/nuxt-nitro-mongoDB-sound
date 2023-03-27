import { useAuthStore } from '../stores/auth.store';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.userLoggedIn;

  if (!isAuthenticated && to.path !== '/' && to.path !== '/about') {
    return navigateTo('/');
  }
});
