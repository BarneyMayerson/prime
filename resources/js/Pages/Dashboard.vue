<script setup>
import { Head } from "@inertiajs/vue3";
import Welcome from "@/Components/Welcome.vue";
</script>

<template>
  <Head title="Dashboard" />
  <div class="py-12">
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="overflow-hidden shadow-xl sm:rounded-lg">
        <Welcome />
      </div>
    </div>
  </div>
</template>
