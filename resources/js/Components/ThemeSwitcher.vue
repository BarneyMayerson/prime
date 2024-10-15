<script setup>
import { ref } from "vue";
import Button from "primevue/button";

const iconClass = ref("pi-moon");

const toggleDarkMode = () => {
  const root = document.getElementsByTagName("html")[0];

  root.classList.toggle("p-dark");
  iconClass.value = iconClass.value === "pi-moon" ? "pi-sun" : "pi-moon";
};
</script>
<template>
  <div class="card flex justify-end p-2 mb-4">
    <ul class="flex list-none m-0 p-0 gap-2 items-center">
      <li>
        <Button
          :icon="`pi ${iconClass}`"
          severity="secondary"
          outlined
          rounded
          aria-label="Toggle Dark Mode"
          @click="toggleDarkMode"
        />
      </li>
    </ul>
  </div>
</template>
