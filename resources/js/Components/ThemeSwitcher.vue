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
  <Button
    :icon="`pi ${iconClass}`"
    severity="secondary"
    outlined
    rounded
    aria-label="Toggle Dark Mode"
    @click="toggleDarkMode"
  />
</template>
