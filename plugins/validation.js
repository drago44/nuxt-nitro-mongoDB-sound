import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from 'vee-validate';
import {
  required,
  min,
  max,
  email,
  min_value as minValue,
  max_value as maxValue,
  alpha_spaces as alphaSpaces,
  confirmed,
} from '@vee-validate/rules';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VeeForm', VeeForm);
  nuxtApp.vueApp.component('VeeField', VeeField);
  nuxtApp.vueApp.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('email', email);
    defineRule('min_value', minValue);
    defineRule('max_value', maxValue);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('password_mismatch', confirmed);

    configure({
      classes: {
        valid: 'is-valid',
        invalid: 'is-invalid'
      },

      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          email: `The field ${ctx.field} must be a valid email.`,
          min_value: `The field ${ctx.field} is too low.`,
          max_value: `The field ${ctx.field} is too high.`,
          alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
          password_mismatch: "The password don't match.",
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
});
