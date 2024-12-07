<script setup>
import { ref } from "vue";
import { Link, router, useForm } from "@inertiajs/vue3";
import FormSection from "@/Components/FormSection.vue";
import InputError from "@/Components/InputError.vue";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";

const props = defineProps({
  user: Object,
});

const form = useForm({
  _method: "PUT",
  name: props.user.name,
  email: props.user.email,
  photo: null,
});

const photoPreview = ref(null);
const photoInput = ref(null);

const updateProfileInformation = () => {
  if (photoInput.value) {
    form.photo = photoInput.value.files[0];
  }

  form.post(route("user-profile-information.update"), {
    errorBag: "updateProfileInformation",
    preserveScroll: true,
    onSuccess: () => {
      clearPhotoFileInput();
      toast.add({
        severity: "success",
        summary: "Success!",
        detail: "Saved!",
        life: 3000,
      });
    },
  });
};

const sendEmailVerification = () => {
  toast.add({
    severity: "success",
    summary: "Success!",
    detail: "A new verification link has been sent to your email address.",
  });
};

const selectNewPhoto = () => {
  photoInput.value.click();
};

const updatePhotoPreview = () => {
  const photo = photoInput.value.files[0];

  if (!photo) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    photoPreview.value = e.target.result;
  };

  reader.readAsDataURL(photo);
};

const deletePhoto = () => {
  router.delete(route("current-user-photo.destroy"), {
    preserveScroll: true,
    onSuccess: () => {
      photoPreview.value = null;
      clearPhotoFileInput();
    },
  });
};

const clearPhotoFileInput = () => {
  if (photoInput.value?.value) {
    photoInput.value.value = null;
  }
};

const toast = useToast();
</script>

<template>
  <FormSection @submitted="updateProfileInformation">
    <template #title> Profile Information </template>

    <template #description>
      Update your account's profile information and email address.
    </template>

    <template #form>
      <!-- Profile Photo -->
      <div
        v-if="$page.props.jetstream.managesProfilePhotos"
        class="col-span-6 sm:col-span-4"
      >
        <!-- Profile Photo File Input -->
        <input
          id="photo"
          ref="photoInput"
          type="file"
          class="hidden"
          @change="updatePhotoPreview"
        />

        <label for="photo">Photo</label>

        <!-- Current Profile Photo -->
        <div v-show="!photoPreview" class="mt-2">
          <img
            :src="user.profile_photo_url"
            :alt="user.name"
            class="h-20 w-20 rounded-full object-cover"
          />
        </div>

        <!-- New Profile Photo Preview -->
        <div v-show="photoPreview" class="mt-2">
          <span
            class="block h-20 w-20 rounded-full bg-cover bg-center bg-no-repeat"
            :style="'background-image: url(\'' + photoPreview + '\');'"
          />
        </div>

        <Button
          severity="secondary"
          class="me-2 mt-2"
          @click.prevent="selectNewPhoto"
        >
          Select A New Photo
        </Button>

        <Button
          v-if="user.profile_photo_path"
          severity="secondary"
          class="mt-2"
          @click.prevent="deletePhoto"
        >
          Remove Photo
        </Button>

        <InputError :message="form.errors.photo" class="mt-2" />
      </div>

      <!-- Name -->
      <div class="col-span-6 mt-6 sm:col-span-4">
        <FloatLabel>
          <InputText
            id="name"
            v-model="form.name"
            class="mt-1 block w-full"
            required
            autocomplete="name"
          />
          <label for="name">Name</label>
        </FloatLabel>
        <InputError :message="form.errors.name" class="mt-2" />
      </div>

      <!-- Email -->
      <div class="col-span-6 mt-10 sm:col-span-4">
        <FloatLabel>
          <InputText
            id="email"
            v-model="form.email"
            class="mt-1 block w-full"
            type="email"
            required
            autocomplete="username"
          />
          <label for="email">Email</label>
        </FloatLabel>
        <InputError :message="form.errors.email" class="mt-2" />

        <div
          v-if="
            $page.props.jetstream.hasEmailVerification &&
            user.email_verified_at === null
          "
        >
          <p class="mt-2 text-sm">
            Your email address is unverified.

            <Link
              :href="route('verification.send')"
              method="post"
              as="button"
              class="rounded-md text-sm underline"
              @click.prevent="sendEmailVerification"
            >
              Click here to re-send the verification email.
            </Link>
          </p>
        </div>
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
