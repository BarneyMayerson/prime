<script setup>
import { ref } from "vue";
import { useForm } from "@inertiajs/vue3";
import ActionMessage from "@/Components/ActionMessage.vue";
import FormSection from "@/Components/FormSection.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";

const passwordInput = ref(null);
const currentPasswordInput = ref(null);

const form = useForm({
  current_password: "",
  password: "",
  password_confirmation: "",
});

const updatePassword = () => {
  form.put(route("user-password.update"), {
    errorBag: "updatePassword",
    preserveScroll: true,
    onSuccess: () => {
      form.reset();
      toast.add({
        severity: "success",
        summary: "Success!",
        detail: "Password has been updated.",
        life: 3000,
      });
    },
    onError: () => {
      if (form.errors.password) {
        form.reset("password", "password_confirmation");
        passwordInput.value.focus();
      }

      if (form.errors.current_password) {
        form.reset("current_password");
        currentPasswordInput.value.focus();
      }
    },
  });
};

const toast = useToast();
</script>

<template>
  <FormSection @submitted="updatePassword">
    <template #title> Update Password </template>

    <template #description>
      Ensure your account is using a long, random password to stay secure.
    </template>

    <template #form>
      <div class="col-span-6 sm:col-span-4">
        <FloatLabel>
          <InputText
            id="current_password"
            ref="currentPasswordInput"
            v-model="form.current_password"
            type="password"
            class="mt-1 block w-full"
            autocomplete="current-password"
          />
          <label for="current_password">Current Password</label>
        </FloatLabel>
        <InputError :message="form.errors.current_password" class="mt-2" />
      </div>

      <div class="col-span-6 mt-10 sm:col-span-4">
        <FloatLabel>
          <InputText
            id="password"
            ref="passwordInput"
            v-model="form.password"
            type="password"
            class="mt-1 block w-full"
            autocomplete="new-password"
          />
          <label for password>New Password</label>
        </FloatLabel>
        <InputError :message="form.errors.password" class="mt-2" />
      </div>

      <div class="col-span-6 mt-2 sm:col-span-4">
        <FloatLabel>
          <InputText
            id="password_confirmation"
            v-model="form.password_confirmation"
            type="password"
            class="mt-1 block w-full"
            autocomplete="new-password"
          />
          <label for="password_confirmation">Confinm Password</label>
        </FloatLabel>
        <InputError :message="form.errors.password_confirmation" class="mt-2" />
      </div>
    </template>

    <template #actions>
      <Button
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        type="submit"
      >
        Save
      </Button>
    </template>
  </FormSection>
</template>
