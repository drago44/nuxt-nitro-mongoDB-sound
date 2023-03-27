<script setup>
  import { useAuthStore } from '@/stores/auth.store';

  const authStore = useAuthStore();
  const { loginUser } = authStore;

  const loginSchema = ref({
    email: 'required|email',
    password: 'required|min:6|max:100',
  });

  const loginInSubmission = ref(false);
  const loginShowAlert = ref(false);
  const loginAlertVariant = ref('wait');
  const loginAlertMsg = ref('Please wait! We are logging you in.');

  const login = async (values) => {
    loginShowAlert.value = true;
    loginInSubmission.value = true;
    loginAlertVariant.value = 'wait';
    loginAlertMsg.value = 'Please wait! We are logging you in.';

    try {
      await loginUser(values);
    } catch (error) {
      loginInSubmission.value = false;
      loginAlertVariant.value = 'alert';
      loginAlertMsg.value = error.statusMessage;
      return;
    }

    loginAlertVariant.value = 'pass';
    loginAlertMsg.value = 'Success! You are now logged in';

    window.location.reload();
  };
</script>
<template>
  <!-- Login Form -->
  <div v-if="loginShowAlert" :class="loginAlertVariant" class="message">
    {{ loginAlertMsg }}
  </div>
  <VeeForm
    :validation-schema="loginSchema"
    @submit="login"
    class="form"
    v-slot="{ errors }"
  >
    <!-- Email -->
    <div class="form__group">
      <label class="form__label">Email</label>
      <VeeField
        name="email"
        type="email"
        class="form__field"
        placeholder="Enter Email"
        :class="errors.email ? 'form__field--alert' : 'form__field--pass'"
      />
      <ErrorMessage class="form__alert" name="email" />
    </div>
    <!-- Password -->
    <div class="form__group">
      <label class="form__label">Password</label>
      <VeeField
        name="password"
        type="password"
        class="form__field"
        placeholder="Password"
        :class="errors.password ? 'form__field--alert' : 'form__field--pass'"
      />
      <ErrorMessage class="form__alert" name="password" />
    </div>
    <BaseButton
      variant="border"
      :loading="loginInSubmission"
      :disabled="loginInSubmission"
      type="submit"
    >
      Submit
    </BaseButton>
  </VeeForm>
</template>

<style lang="scss">
  .form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    gap: rem(20);

    &__group {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
    }

    &__label {
      font-size: rem(14);
      display: inline-block;
      margin: rem(0) rem(0) rem(5) rem(0);
    }

    &__field {
      max-width: rem(300);
      width: 100%;
      height: rem(40);
      outline: none;
      border-radius: rem(5);
      border-bottom: rem(2) solid transparent;
      background: rgba(70, 90, 126, 0.2);
      padding: rem(0) rem(10);
      margin: rem(0) rem(0) rem(5) rem(0);

      &:focus {
        border-bottom: rem(2) solid yellow;
      }

      &--alert {
        border-bottom: rem(2) solid red;
      }

      &--pass {
        border-bottom: rem(2) solid green;
      }
    }

    &__alert {
      font-size: rem(12);
      opacity: 1;
      color: red;
    }
  }
</style>
