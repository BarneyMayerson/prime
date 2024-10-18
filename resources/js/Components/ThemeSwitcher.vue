<script setup>
import { onMounted, ref } from "vue";
import Button from "primevue/button";

const theme = ref("light");
const themes = ["light", "dark"];
const iconClass = ref("pi-moon");

const toggleDarkMode = () => {
  const root = document.getElementsByTagName("html")[0];

  theme.value === "light" ? applyDark(root) : applyLight(root);
};

const applyDark = (el) => {
  el.classList.add("p-dark");
  iconClass.value = "pi-sun";
  theme.value = "dark";
  localStorage.theme = "dark";
};

const applyLight = (el) => {
  el.classList.remove("p-dark");
  iconClass.value = "pi-moon";
  theme.value = "light";
  localStorage.theme = "light";
};

onMounted(() => {
  const root = document.getElementsByTagName("html")[0];

  if (themes.includes(localStorage.theme)) {
    theme.value = localStorage.theme;

    if (theme.value === "dark") {
      applyDark(root);
    }
  }
});
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
