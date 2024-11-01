<script setup>
import { Head, useForm } from "@inertiajs/vue3";
import { useModal } from "momentum-modal";
import AuthenticationCardLogo from "@/Components/AuthenticationCardLogo.vue";
import InputError from "@/Components/InputError.vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";

defineProps({
  status: String,
});

const form = useForm({
  email: "",
});

const submit = () => {
  form.post(route("password.email"), {
    onSuccess: () =>
      toast.add({
        severity: "success",
        summary: "Success!",
        detail: "Your password reset link has been emailed.",
        life: 4000,
      }),
  });
};

const { show, redirect } = useModal();
const toast = useToast();
</script>

<template>
  <Head title="Forgot Password" />

  <Dialog
    v-model:visible="show"
    modal
    dismissableMask
    header="Forgot Password"
    position="top"
    class="w-[30rem]"
    pt:mask:class="backdrop-blur-sm"
    @after-hide="redirect"
  >
    <AuthenticationCardLogo class="flex justify-center" />

    <div class="mb-4 mt-8 text-sm">
      Forgot your password? No problem. Just let us know your email address and
      we will email you a password reset link that will allow you to choose a
      new one.
    </div>

    <div
      v-if="status"
      class="mb-4 text-sm font-medium text-green-600 dark:text-green-400"
    >
      {{ status }}
    </div>

    <form @submit.prevent="submit" class="mt-8">
      <div>
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

      <div class="mt-4 flex items-center justify-end">
        <Button
          type="submit"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Email Password Reset Link
        </Button>
      </div>
    </form>
  </Dialog>
</template>
