<script setup>
import { ref } from "vue";
import { useForm } from "@inertiajs/vue3";
import ActionSection from "@/Components/ActionSection.vue";
import InputError from "@/Components/InputError.vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";

const confirmingUserDeletion = ref(false);
const passwordInput = ref(null);

const form = useForm({
  password: "",
});

const confirmUserDeletion = () => {
  confirmingUserDeletion.value = true;

  setTimeout(() => passwordInput.value.focus(), 250);
};

const deleteUser = () => {
  form.delete(route("current-user.destroy"), {
    preserveScroll: true,
    onSuccess: () => closeModal(),
    onError: () => passwordInput.value.focus(),
    onFinish: () => form.reset(),
  });
};

const closeModal = () => {
  confirmingUserDeletion.value = false;

  form.reset();
};
</script>

<template>
  <ActionSection>
    <template #title> Delete Account </template>

    <template #description> Permanently delete your account. </template>

    <template #content>
      <div class="max-w-xl text-sm">
        Once your account is deleted, all of its resources and data will be
        permanently deleted. Before deleting your account, please download any
        data or information that you wish to retain.
      </div>

      <div class="mt-5">
        <Button severity="danger" @click="confirmUserDeletion">
          Delete Account
        </Button>
      </div>

      <!-- Delete Account Confirmation Modal -->
      <Dialog
        v-model:visible="confirmingUserDeletion"
        modal
        dismissableMask
        header="Delete Account"
        :style="{ width: '28rem' }"
        @close="closeModal"
      >
        <span class="text-surface-500 dark:text-surface-400 mb-8 block">
          Are you sure you want to delete your account? Once your account is
          deleted, all of its resources and data will be permanently deleted.
          Please enter your password to confirm you would like to permanently
          delete your account.
        </span>

        <div class="mt-4">
          <InputText
            ref="passwordInput"
            v-model="form.password"
            type="password"
            class="mt-1 block w-full"
            placeholder="Password"
            autocomplete="current-password"
            @keyup.enter="deleteUser"
          />

          <InputError :message="form.errors.password" class="mt-2" />
        </div>

        <template #footer>
          <Button severity="secondary" @click="closeModal">Cancel</Button>

          <Button
            severity="danger"
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
            @click="deleteUser"
          >
            Delete Account
          </Button>
        </template>
      </Dialog>
    </template>
  </ActionSection>
</template>
