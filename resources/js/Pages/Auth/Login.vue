<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3";
import { useModal } from "momentum-modal";
import AuthenticationCardLogo from "@/Components/AuthenticationCardLogo.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";

defineProps({
  canResetPassword: Boolean,
  status: String,
});

const form = useForm({
  email: "",
  password: "",
  remember: false,
});

const submit = () => {
  form
    .transform((data) => ({
      ...data,
      remember: form.remember ? "on" : "",
    }))
    .post(route("login"), {
      onFinish: () => form.reset("password"),
      onSuccess: () =>
        toast.add({
          severity: "success",
          summary: "Welcome back!",
          detail: "You have been logged in.",
          life: 3000,
        }),
    });
};

const { show, redirect } = useModal();
const toast = useToast();
</script>

<template>
  <Head title="Log In" />

  <Dialog
    v-model:visible="show"
    modal
    dismissableMask
    header="Log In"
    position="top"
    class="w-[30rem]"
    pt:mask:class="backdrop-blur-sm"
    @after-hide="redirect"
  >
    <AuthenticationCardLogo class="flex justify-center" />

    <div
      v-if="status"
      class="mb-4 text-sm font-medium text-green-600 dark:text-green-400"
    >
      {{ status }}
    </div>

    <form @submit.prevent="submit" class="mt-8">
      <div>
        <InputLabel for="email" value="Email" />
        <InputText
          id="email"
          v-model="form.email"
          type="text"
          class="mt-1 block w-full"
          required
          autofocus
          autocomplete="username"
          :invalid="form.errors.email"
        />
        <InputError class="mt-2" :message="form.errors.email" />
      </div>

      <div class="mt-4">
        <InputLabel for="password" value="Password" />
        <InputText
          id="password"
          v-model="form.password"
          type="password"
          class="mt-1 block w-full"
          required
          autocomplete="current-password"
          :invalid="form.errors.password"
        />
        <InputError class="mt-2" :message="form.errors.password" />
      </div>

      <div class="mt-4 block">
        <label class="flex items-center">
          <Checkbox v-model="form.remember" :binary="true" name="remember" />
          <span class="ms-2 text-sm">Remember me</span>
        </label>
      </div>

      <div class="mt-4 flex items-center justify-end">
        <Link
          v-if="canResetPassword"
          :href="route('password.request')"
          class="rounded-md text-sm"
        >
          Forgot your password?
        </Link>

        <Button
          class="ms-4"
          type="submit"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Log in
        </Button>
      </div>
    </form>
  </Dialog>
</template>
