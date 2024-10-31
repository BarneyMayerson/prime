<script setup>
import { ref } from "vue";
import { Head, Link } from "@inertiajs/vue3";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

defineProps({
  laravelVersion: {
    type: String,
    required: true,
  },
  phpVersion: {
    type: String,
    required: true,
  },
});

const selectedCountries = ref();
const countries = ref([
  { name: "Australia", code: "AU" },
  { name: "Brazil", code: "BR" },
  { name: "China", code: "CN" },
  { name: "Egypt", code: "EG" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "India", code: "IN" },
  { name: "Japan", code: "JP" },
  { name: "Spain", code: "ES" },
  { name: "United States", code: "US" },
]);

const visibleDialog = ref(false);
</script>

<template>
  <Head title="Welcome" />
  <div class="mx-auto mt-6 max-w-7xl">
    <div class="card flex justify-center space-x-2">
      <Button label="Primary" />
      <FloatLabel>
        <InputText id="username" />
        <label for="username">Username</label>
      </FloatLabel>
      <MultiSelect
        v-model="selectedCountries"
        :options="countries"
        optionLabel="name"
        filter
        placeholder="Select Countries"
        display="chip"
        class="w-full md:w-80"
      >
        <template #option="slotProps">
          <div class="flex items-center">
            <img
              :alt="slotProps.option.name"
              src="/storage/flag_placeholder.png"
              :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`"
              style="width: 18px"
            />
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
        <template #dropdownicon>
          <i class="pi pi-map" />
        </template>
        <template #filtericon>
          <i class="pi pi-map-marker" />
        </template>
        <template #header>
          <div class="px-3 py-2 font-medium">Available Countries</div>
        </template>
        <template #footer>
          <div class="flex justify-between p-3">
            <Button
              label="Add New"
              severity="secondary"
              text
              size="small"
              icon="pi pi-plus"
            />
            <Button
              label="Remove All"
              severity="danger"
              text
              size="small"
              icon="pi pi-times"
            />
          </div>
        </template>
      </MultiSelect>
    </div>

    <div class="mt-12 flex flex-col gap-8">
      <div
        class="border-4 border-primary-600 bg-primary p-4 text-primary-contrast"
      >
        Content
      </div>
      <div
        class="border-surface-200 bg-surface-100 p-4 text-surface-900 hover:text-surface-700 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-0 dark:hover:text-surface-200"
      >
        Content
      </div>
      <div class="p-4 hover:bg-emphasis hover:text-color-emphasis">Content</div>
      <div class="p-4">
        <div class="overflow-hidden py-8">
          <p class="text-primary">Animation</p>
          <div
            :class="`mx-auto h-16 w-16 animate-fadeinleft bg-primary animate-duration-3000 animate-infinite rounded-border`"
          ></div>
        </div>
      </div>
    </div>

    <div class="card flex justify-center">
      <Button label="Show Dialog" @click="visibleDialog = true" />
      <Dialog
        v-model:visible="visibleDialog"
        modal
        header="Edit Profile"
        :style="{ width: '25rem' }"
      >
        <span class="mb-8 block text-surface-500 dark:text-surface-400">
          Update your information.
        </span>
        <div class="mb-4 flex items-center gap-4">
          <label for="username" class="w-24 font-semibold">Username</label>
          <InputText id="username" class="flex-auto" autocomplete="off" />
        </div>
        <div class="mb-8 flex items-center gap-4">
          <label for="email" class="w-24 font-semibold">Email</label>
          <InputText id="email" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="visibleDialog = false"
          />
          <Button type="button" label="Save" @click="visibleDialog = false" />
        </div>
      </Dialog>
    </div>
  </div>

  <footer class="py-16 text-center text-sm">
    Laravel v{{ laravelVersion }} (PHP v{{ phpVersion }})
  </footer>
</template>
