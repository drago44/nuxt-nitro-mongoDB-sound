<script setup>
  import { useAuthStore } from '@/stores/auth.store';

  const authStore = useAuthStore();
  const { registerUser } = authStore;

  const regSchema = ref({
    name: 'required|min:2|max:100|alpha_spaces',
    email: 'required|min:2|max:100|email',
    password: 'required|min:6|max:100',
    confirm_password: 'password_mismatch:@password',
  });

  const regInSubmission = ref(false);
  const regShowAlert = ref(false);
  const regAlertVariant = ref('wait');
  const regAlertMsg = ref('Please wait! Your account is being created.');

  const register = async (values) => {
    regShowAlert.value = true;
    regInSubmission.value = true;
    regAlertVariant.value = 'wait';
    regAlertMsg.value = 'Please wait! Your account is being created.';

    try {
      await registerUser(values);
    } catch (error) {
      regInSubmission.value = false;
      regAlertVariant.value = 'alert';
      regAlertMsg.value = error.statusMessage;
      return;
    }

    regAlertVariant.value = 'pass';
    regAlertMsg.value = 'Success! Your account has been created';

    window.location.reload();
  };
</script>

<template>
  <!-- Registration Form -->
  <div v-if="regShowAlert" :class="regAlertVariant" class="message">
    {{ regAlertMsg }}
  </div>
  <VeeForm
    :validation-schema="regSchema"
    @submit="register"
    class="form"
    v-slot="{ errors }"
  >
    <!-- Name -->
    <div class="form__group">
      <label class="form__label">Name</label>
      <VeeField
        name="name"
        type="text"
        class="form__field"
        placeholder="Enter Name"
        :class="errors.name ? 'form__field--alert' : 'form__field--pass'"
      />
      <ErrorMessage class="form__alert" name="name" />
    </div>
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
    <!-- Confirm Password -->
    <div class="form__group">
      <label class="form__label">Confirm Password</label>
      <VeeField
        name="confirm_password"
        type="password"
        class="form__field"
        placeholder="Confirm Password"
        :class="
          errors.confirm_password ? 'form__field--alert' : 'form__field--pass'
        "
      />
      <ErrorMessage class="form__alert" name="confirm_password" />
    </div>
    <BaseButton
      variant="border"
      :loading="regInSubmission"
      :disabled="regInSubmission"
      type="submit"
    >
      Submit
    </BaseButton>
  </VeeForm>
</template>
