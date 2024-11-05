<script setup>
import { ref, reactive, nextTick } from "vue";
import InputError from "./InputError.vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";

const emit = defineEmits(["confirmed"]);

defineProps({
  title: {
    type: String,
    default: "Confirm Password",
  },
  content: {
    type: String,
    default: "For your security, please confirm your password to continue.",
  },
  button: {
    type: String,
    default: "Confirm",
  },
});

const confirmingPassword = ref(false);

const form = reactive({
  password: "",
  error: "",
  processing: false,
});

const passwordInput = ref(null);

const startConfirmingPassword = () => {
  axios.get(route("password.confirmation")).then((response) => {
    if (response.data.confirmed) {
      emit("confirmed");
    } else {
      confirmingPassword.value = true;

      setTimeout(() => passwordInput.value.focus(), 250);
    }
  });
};

const confirmPassword = () => {
  form.processing = true;

  axios
    .post(route("password.confirm"), {
      password: form.password,
    })
    .then(() => {
      form.processing = false;

      closeModal();
      nextTick().then(() => emit("confirmed"));
    })
    .catch((error) => {
      form.processing = false;
      form.error = error.response.data.errors.password[0];
      passwordInput.value.focus();
    });
};

const closeModal = () => {
  confirmingPassword.value = false;
  form.password = "";
  form.error = "";
};
</script>

<template>
  <span>
    <span @click="startConfirmingPassword">
      <slot />
    </span>

    <Dialog
      v-model:visible="confirmingPassword"
      modal
      :header="title"
      :style="{ width: '28rem' }"
      @close="closeModal"
    >
      <div>
        {{ content }}

        <div class="mt-8">
          <FloatLabel>
            <InputText
              ref="passwordInput"
              v-model="form.password"
              type="password"
              class="mt-1 block w-full"
              name="password"
              autocomplete="current-password"
              @keyup.enter="confirmPassword"
            />
            <label for="password">Password</label>
          </FloatLabel>
          <InputError :message="form.error" class="mt-2" />
        </div>
      </div>

      <template #footer>
        <Button severity="secondary" @click="closeModal">Cancel</Button>

        <Button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
          @click="confirmPassword"
        >
          {{ button }}
        </Button>
      </template>
    </Dialog>
  </span>
</template>
