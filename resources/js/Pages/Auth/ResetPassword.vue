<script setup>
import { Head, useForm } from "@inertiajs/vue3";
import AuthenticationCard from "@/Components/AuthenticationCard.vue";
import AuthenticationCardLogo from "@/Components/AuthenticationCardLogo.vue";
import InputError from "@/Components/InputError.vue";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";

const props = defineProps({
  email: String,
  token: String,
});

const form = useForm({
  token: props.token,
  email: props.email,
  password: "",
  password_confirmation: "",
});

const submit = () => {
  form.post(route("password.update"), {
    onFinish: () => form.reset("password", "password_confirmation"),
  });
};
</script>

<template>
  <Head title="Reset Password" />

  <AuthenticationCard>
    <template #logo>
      <AuthenticationCardLogo />
    </template>

    <form @submit.prevent="submit">
      <div class="mt-6">
        <FloatLabel>
          <InputText
            id="email"
            v-model="form.email"
            type="email"
            class="mt-1 block w-full"
            required
            autofocus
            autocomplete="username"
            :invalid="form.errors.email"
          />
          <label for="email">Email</label>
        </FloatLabel>
        <InputError class="mt-2" :message="form.errors.email" />
      </div>

      <div class="mt-10">
        <FloatLabel>
          <InputText
            id="password"
            v-model="form.password"
            type="password"
            class="mt-1 block w-full"
            required
            autocomplete="new-password"
            :invalid="form.errors.password"
          />
          <label for="password">Password</label>
        </FloatLabel>
        <InputError class="mt-2" :message="form.errors.password" />
      </div>

      <div class="mt-10">
        <FloatLabel>
          <InputText
            id="password_confirmation"
            v-model="form.password_confirmation"
            type="password"
            class="mt-1 block w-full"
            required
            autocomplete="new-password"
            :invalid="form.errors.password_confirmation"
          />
          <label for="password_confirmation">Confirm Password</label>
        </FloatLabel>
        <InputError class="mt-2" :message="form.errors.password_confirmation" />
      </div>

      <div class="mt-4 flex items-center justify-end">
        <Button
          type="submit"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Reset Password
        </Button>
      </div>
    </form>
  </AuthenticationCard>
</template>
