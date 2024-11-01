<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3";
import { useModal } from "momentum-modal";
import AuthenticationCardLogo from "@/Components/AuthenticationCardLogo.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import Dialog from "primevue/dialog";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";

const form = useForm({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  terms: false,
});

const submit = () => {
  form.post(route("register"), {
    onFinish: () => form.reset("password", "password_confirmation"),
  });
};

const { show, redirect } = useModal();
</script>

<template>
  <Head title="Register" />

  <Dialog
    v-model:visible="show"
    modal
    dismissableMask
    header="Register"
    position="top"
    class="w-[30rem]"
    pt:mask:class="backdrop-blur-sm"
    @after-hide="redirect"
  >
    <AuthenticationCardLogo class="flex justify-center" />

    <form @submit.prevent="submit" class="mt-8">
      <div>
        <FloatLabel>
          <InputText
            id="name"
            v-model="form.name"
            class="mt-1 block w-full"
            required
            autofocus
            autocomplete="name"
            :invalid="form.errors.name"
          />
          <label for="name">Name</label>
        </FloatLabel>
        <InputError class="mt-2" :message="form.errors.name" />
      </div>

      <div class="mt-10">
        <FloatLabel>
          <InputText
            id="email"
            v-model="form.email"
            type="email"
            class="mt-1 block w-full"
            required
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
          <label for="password_comfirmation">Confirm Password</label>
        </FloatLabel>
        <InputError class="mt-2" :message="form.errors.password_confirmation" />
      </div>

      <div
        v-if="$page.props.jetstream.hasTermsAndPrivacyPolicyFeature"
        class="mt-4"
      >
        <InputLabel for="terms">
          <div class="flex items-center">
            <Checkbox
              id="terms"
              v-model="form.terms"
              :binary="true"
              name="terms"
              required
            />

            <div class="ms-2">
              I agree to the
              <a
                target="_blank"
                :href="route('terms.show')"
                class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >Terms of Service</a
              >
              and
              <a
                target="_blank"
                :href="route('policy.show')"
                class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >Privacy Policy</a
              >
            </div>
          </div>
          <InputError class="mt-2" :message="form.errors.terms" />
        </InputLabel>
      </div>

      <div class="mt-6 flex items-center justify-end">
        <Link :href="route('login')" tabindex="-1">
          <Button label="Already registered?" link />
        </Link>

        <Button
          class="ms-4"
          type="submit"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Register
        </Button>
      </div>
    </form>
  </Dialog>
</template>
