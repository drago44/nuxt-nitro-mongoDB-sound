import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const user = ref({});
  const userLoggedIn = useCookie('auth');
  const token = useCookie('token');

  const registerUser = async (user) => {
    const reqBody = JSON.stringify(user);
    const response = await $fetch('/api/register', {
      method: 'POST',
      body: reqBody,
    });
    token.value = response;

    userLoggedIn.value = true;
  };

  const loginUser = async (values) => {
    const auth = JSON.stringify(values);
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: auth,
    });
    token.value = response;

    userLoggedIn.value = true;
  };

  const handleLogout = () => {
    // token.value = '';
    userLoggedIn.value = false;
    useRouter().push('/');
  };

  return {
    user,
    userLoggedIn,
    token,
    registerUser,
    loginUser,
    handleLogout,
  };
});
