<script setup>
import { ref } from "vue";
import { Head, Link } from "@inertiajs/vue3";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";

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
        class="bg-primary text-primary-contrast border-primary-600 border-4 p-4"
      >
        Content
      </div>
      <div
        class="bg-surface-100 dark:bg-surface-900 text-surface-900 dark:text-surface-0 border-surface-200 dark:border-surface-700 hover:text-surface-700 dark:hover:text-surface-200 p-4"
      >
        Content
      </div>
      <div class="hover:bg-emphasis hover:text-color-emphasis p-4">Content</div>
      <div class="p-4">
        <div class="overflow-hidden py-8">
          <p class="text-primary">Animation</p>
          <div
            :class="`rounded-border bg-primary animate-fadeinleft animate-infinite animate-duration-3000 mx-auto h-16 w-16`"
          ></div>
        </div>
      </div>
    </div>
  </div>

  <footer class="py-16 text-center text-sm">
    Laravel v{{ laravelVersion }} (PHP v{{ phpVersion }})
  </footer>
</template>
