<script setup>
import { ref } from "vue";
import { Head, Link } from "@inertiajs/vue3";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";
import ThemeSwitcher from "@/Components/ThemeSwitcher.vue";
import ColorSchemeSwitcher from "@/Components/ColorSchemeSwitcher.vue";

defineProps({
  canLogin: {
    type: Boolean,
  },
  canRegister: {
    type: Boolean,
  },
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
  <header class="mx-auto max-w-7xl py-10">
    <nav class="flex flex-1 items-center justify-end space-x-2">
      <ThemeSwitcher />
      <ColorSchemeSwitcher />
      <template v-if="canLogin">
        <Link
          v-if="$page.props.auth.user"
          tabindex="-1"
          :href="route('dashboard')"
        >
          <Button label="Dashboard" link />
        </Link>

        <template v-else>
          <Link :href="route('login')" tabindex="-1">
            <Button label="Login" link />
          </Link>

          <Link
            v-if="canRegister"
            tabindex="-1"
            :href="route('register')"
            class="outline-none"
          >
            <Button label="Register" link />
          </Link>
        </template>
      </template>
    </nav>
  </header>

  <main class="mx-auto mt-6 max-w-7xl">
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
  </main>

  <footer class="py-16 text-center text-sm">
    Laravel v{{ laravelVersion }} (PHP v{{ phpVersion }})
  </footer>
</template>
